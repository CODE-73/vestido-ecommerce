import { getPrismaClient } from '@vestido-ecommerce/models';
import { createShiprocketOrder } from '@vestido-ecommerce/shiprocket';
import { VestidoError } from '@vestido-ecommerce/utils';

import { CreateAddressSchema } from '../../address/create-address/zod';
import { getOrder } from '../../orders/get-order';
import { getFulfillment } from '../get-fulfillment';
import { SubmitFulfillmentSchema } from './zod';

export async function submitFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    const existingFulfillment = await getFulfillment(fulfillmentId);

    const orderOfFulfillment = await getOrder(existingFulfillment.orderId);
    if (
      orderOfFulfillment?.orderStatus !== 'CONFIRMED' &&
      orderOfFulfillment?.orderStatus !== 'IN_PROGRESS'
    ) {
      throw new VestidoError({
        name: 'OrderNotInConfirmedState',
        message: `Order is not in CONFIRMED/IN_PROGRESS Status. ${existingFulfillment.orderId} is in ${orderOfFulfillment?.orderStatus} status`,
        httpStatus: 401,
      });
    }

    if (existingFulfillment.status !== 'DRAFT') {
      throw new VestidoError({
        name: 'FulfillmentSubmissionFailed',
        message: `Fulfillment has already been ${existingFulfillment.status}`,
        httpStatus: 400,
        context: {
          fulfillmentId: fulfillmentId,
          fulfillmentStatus: existingFulfillment.status,
        },
      });
    }

    const validatedFulfillment =
      SubmitFulfillmentSchema.parse(existingFulfillment);

    // Prepare the updates for OrderItems
    const updates = existingFulfillment.fulfillmentItems.map(async (item) => {
      const orderItem = await prisma.orderItem.findUnique({
        where: {
          id: item.orderItemId,
        },
        select: {
          qty: true,
          fulfilledQuantity: true,
          status: true,
        },
      });

      if (!orderItem) {
        throw new VestidoError({
          name: 'SystemErrorOrderItemNotFound',
          message: `OrderItem ${orderItem} not found`,
        });
      }

      const newFulfilledQuantity =
        (orderItem.fulfilledQuantity || 0) + item.quantity;

      if (newFulfilledQuantity > orderItem.qty) {
        // Quantity exceeds the OrderItem's quantity, do not update
        throw new VestidoError({
          name: 'FulfillmentQuantityError',
          message: 'Fulfilled quantity exceeds OrderItem quantity.',
          httpStatus: 400,
          context: {
            fulfillmentId: fulfillmentId,
            orderItemQuantity: orderItem.qty,
            submittingQuantity: newFulfilledQuantity,
          },
        });
      }

      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: item.orderItemId,
        },
        data: {
          fulfilledQuantity: newFulfilledQuantity,
          status: 'IN_PROGRESS',
          deliveryStatus: 'IN_PROGRESS',
        },
      });

      return updatedOrderItem;
    });

    // Execute the updates
    await Promise.all(updates);

    // Check if all OrderItems' statuses are IN_PROGRESS and update Order status
    const order = await prisma.order.findUnique({
      where: {
        id: existingFulfillment.orderId,
      },
      include: {
        customer: true,
        shippingAddress: true,
        payments: true,
        orderItems: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!order) {
      throw new VestidoError({
        name: 'SystemErrorOrderNotFound',
        message: `Order ${order} not found.`,
      });
    }

    // Calculate the total item price of the fulfillment items
    const fulfillmentItemTotal = existingFulfillment.fulfillmentItems.reduce(
      (sum, item) => {
        const pricePerUnit =
          item.orderItem.item.discountedPrice ?? item.orderItem.item.price;
        const totalPriceForItem = pricePerUnit * item.quantity;
        return sum + totalPriceForItem;
      },
      0,
    );

    // Calculate the total item price of all items in the order
    const orderItemTotal = order.orderItems.reduce((sum, item) => {
      const pricePerUnit = item.item.discountedPrice ?? item.item.price;
      const totalPriceForItem = pricePerUnit * item.qty;
      return sum + totalPriceForItem;
    }, 0);

    // Calculate the ratio and the total amount for this fulfillment
    const totalAmount =
      (fulfillmentItemTotal / orderItemTotal) * order.grandTotal;

    const fulfillmentCharges =
      (fulfillmentItemTotal / orderItemTotal) * order.totalCharges;

    const fulfillmentDisc =
      (fulfillmentItemTotal / orderItemTotal) * order.totalDiscount;

    const totalAmountWithoutChargesDiscount =
      totalAmount - fulfillmentCharges + fulfillmentDisc;

    // Update the Fulfillment status
    await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        status: 'AWAITING_PICKUP',
        price: totalAmount,
      },
      include: {
        fulfillmentItems: true, // Include the related fulfillment items
      },
    });

    // Change Order Status to 'IN_PROGRESS' when atleast one Fulfillment is Submitted
    const atLeastOneItemInProgress = order.orderItems.some(
      (item) => item.status === 'IN_PROGRESS',
    );

    if (atLeastOneItemInProgress) {
      await prisma.order.update({
        where: {
          id: existingFulfillment.orderId,
        },
        data: {
          orderStatus: 'IN_PROGRESS',
          deliveryStatus: 'IN_PROGRESS',
        },
      });
    }

    // Check if all OrderItems are fully fulfilled (all items have fulfilledQuantity equal to qty)
    // const allItemsFulfilled = order.orderItems.every((item) => {
    //   return item.fulfilledQuantity === item.qty;
    // });

    // If all items are fulfilled, delete remaining DRAFT fulfillments
    //    if (allItemsFulfilled) {}

    const validatedAddress = CreateAddressSchema.parse(order.shippingAddress);

    const fulfillmentItems = existingFulfillment.fulfillmentItems.map(
      (item) => ({
        name: item.orderItem.item.title,
        sku:
          item.orderItem.item.sku ||
          Math.floor(Math.random() * 1000000).toString(),
        units: item.quantity,
        selling_price: item.orderItem.item.price,
        discount: item.orderItem.item.discountedPrice
          ? item.orderItem.item.price - item.orderItem.item.discountedPrice
          : 0,
        tax: item.orderItem.item.taxRate,
        hsn: '',
      }),
    );

    const firstPaymentGateway = order.payments[0].paymentGateway;
    const paymentMethod =
      firstPaymentGateway === 'CASH_ON_DELIVERY' ? 'COD' : 'Prepaid';

    const shiprocketData = {
      fulfillmentId,
      orderDate: order.dateTime,
      pickupLocation: validatedFulfillment.pickup_location,
      shippingIsBilling: true,
      billing_customer_name: validatedAddress.firstName,
      billing_last_name: validatedAddress.lastName,
      billing_email: `${validatedAddress.mobile}@vestidonation.com`,
      billing_phone: validatedAddress.mobile,
      billing_address: validatedAddress.line1,
      billing_address_2: validatedAddress.line2,
      billing_city: validatedAddress.district,
      billing_pincode: validatedAddress.pinCode,
      billing_state: validatedAddress.state,
      order_items: fulfillmentItems,
      paymentMethod: paymentMethod,
      totalAmount: totalAmountWithoutChargesDiscount,
      length: validatedFulfillment.length,
      breadth: validatedFulfillment.breadth,
      height: validatedFulfillment.height,
      weight: validatedFulfillment.weight,
      shipping_charges: fulfillmentCharges,
      total_discount: fulfillmentDisc,
    };

    const shiprocketOrder = await createShiprocketOrder(shiprocketData);

    await prisma.fulfillmentLog.create({
      data: {
        fullfillmentId: fulfillmentId,
        logType: 'SHIPROCKET_CREATE_ORDER_RESPONSE',
        rawData: shiprocketOrder,
      },
    });

    const shippingFulfillment = await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        shiprocket_order_id: String(shiprocketOrder.order_id),
        shipment_id: String(shiprocketOrder.shipment_id),
        tracking: shiprocketOrder.awb_code
          ? String(shiprocketOrder.awb_code)
          : null,
      },
      include: {
        fulfillmentItems: true,
      },
    });

    return shippingFulfillment;
  });

  return result;
}
