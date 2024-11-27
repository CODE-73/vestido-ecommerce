import { getPrismaClient } from '@vestido-ecommerce/models';
import { createShiprocketOrder } from '@vestido-ecommerce/shiprocket';
import { VestidoError } from '@vestido-ecommerce/utils';

import { CreateAddressSchema } from '../../address/create-address/zod';
import { getFulfillment } from '../get-fulfillment';

export async function submitFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    const existingFulfillment = await getFulfillment(fulfillmentId);

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
          status:
            newFulfilledQuantity === orderItem.qty
              ? 'IN_PROGRESS'
              : orderItem.status,
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
      (fulfillmentItemTotal / orderItemTotal) * order.totalPrice;

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

    // TODO: Change Order Status to 'IN_PROGRESS' when atleast one Fulfillment is Submitted
    const allItemsInProgress = order.orderItems.every(
      (item) => item.status === 'IN_PROGRESS',
    );

    if (allItemsInProgress) {
      await prisma.order.update({
        where: {
          id: existingFulfillment.orderId,
        },
        data: {
          orderStatus: 'IN_PROGRESS',
        },
      });

      // Delete fulfillment items associated with the DRAFT fulfillments
      const draftFulfillments = await prisma.fulfillment.findMany({
        where: {
          orderId: existingFulfillment.orderId,
          status: 'DRAFT',
          id: {
            not: fulfillmentId, // Exclude the currently processed fulfillment
          },
        },
        select: {
          id: true,
        },
      });

      const draftFulfillmentIds = draftFulfillments.map((f) => f.id);

      await prisma.fulfillmentItem.deleteMany({
        where: {
          fulfillmentId: {
            in: draftFulfillmentIds,
          },
        },
      });

      // Delete the DRAFT fulfillments themselves
      await prisma.fulfillment.deleteMany({
        where: {
          id: {
            in: draftFulfillmentIds,
          },
        },
      });
    }

    const validatedAddress = CreateAddressSchema.parse(order.shippingAddress);

    const fulfillmentItems = existingFulfillment.fulfillmentItems.map(
      (item) => ({
        name: item.orderItem.item.title,
        sku:
          item.orderItem.item.sku ||
          Math.floor(Math.random() * 1000000).toString(),
        units: item.quantity,
        selling_price: item.orderItem.item.price,
        discount: item.orderItem.item.discountedPrice,
        tax: '',
        hsn: '',
      }),
    );

    const firstPaymentGateway = order.payments[0].paymentGateway;
    const paymentMethod =
      firstPaymentGateway === 'CASH_ON_DELIVERY' ? 'COD' : 'Prepaid';

    const shiprocketData = {
      fulfillmentId,
      orderDate: order.dateTime,
      pickupLocation: 'Home',
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
      totalAmount: totalAmount,
      length: existingFulfillment.length ?? 0,
      breadth: existingFulfillment.breadth ?? 0,
      height: existingFulfillment.height ?? 0,
      weight: existingFulfillment.weight ?? 0,
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
