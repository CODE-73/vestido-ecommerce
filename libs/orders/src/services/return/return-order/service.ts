import { getPrismaClient } from '@vestido-ecommerce/models';
import { createShiprocketReturnOrder } from '@vestido-ecommerce/shiprocket';
import { VestidoError } from '@vestido-ecommerce/utils';

import { createOrder } from '../../orders/create-order';
import { getOrder } from '../../orders/get-order';
import {
  ReturnOrderSchema,
  ReturnOrderSchemaType,
  ReturnPackageSchema,
} from './zod';

export async function returnOrder(data: ReturnOrderSchemaType) {
  const prisma = getPrismaClient();

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    const validatedData = await ReturnOrderSchema.parse(data);

    const orderDetails = await getOrder(validatedData.orderId);
    if (!orderDetails) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Order Not Found Error',
        httpStatus: 404,
        context: {
          orderId: validatedData.orderId,
        },
      });
    }

    const fulfillmentDetails = await prisma.fulfillment.findFirst({
      where: {
        id: validatedData.fulfillmentId,
      },
      include: {
        fulfillmentItems: {
          select: {
            fulfillmentItemPrice: true,
          },
        },
      },
    });
    if (!fulfillmentDetails) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Fulfillment Not Found Error',
        httpStatus: 404,
        context: {
          orderId: validatedData.fulfillmentId,
        },
      });
    }
    if (fulfillmentDetails.status !== 'DELIVERED') {
      throw new VestidoError({
        name: 'FulfillmentNotInDeliveredState',
        message: `Fulfillment is not in DELIVERED Status. ${fulfillmentDetails.id} is in ${fulfillmentDetails?.status} status`,
        httpStatus: 401,
      });
    }

    const today = new Date();
    const deliveredDate = new Date(fulfillmentDetails.deliveredDate!);
    const daysDifference = Math.floor(
      (today.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDifference > 3) {
      throw new VestidoError({
        name: 'ReturnWindowExpired',
        message: `The return window has expired. ${fulfillmentDetails.id} was delivered on ${fulfillmentDetails.deliveredDate}.`,
        httpStatus: 401,
      });
    }

    const refundAmount = validatedData.returnItems.reduce((sum, item) => {
      const totalPricePerItem = item.FulfillmentItemPrice * item.quantity;
      return sum + totalPricePerItem;
    }, 0);

    const returnOrder = await prisma.return.create({
      data: {
        fulfillmentId: validatedData.fulfillmentId,
        orderId: validatedData.orderId,
        reason: validatedData.reason,
        status: 'AWAITING_PICKUP',
        refundAmount: refundAmount,
        refundStatus: 'PENDING',
        returnItems: {
          createMany: {
            data: validatedData.returnItems.map((i) => ({
              orderItemId: i.orderItemId,
              qty: i.quantity,
            })),
          },
        },
      },
      include: {
        returnItems: {
          include: {
            orderItem: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    // Find the payment that are not Refund
    const validPayments = orderDetails.payments.filter(
      (payment) => payment.isRefund === false,
    );

    if (!validPayments) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Valid Payment does not exist',
        httpStatus: 404,
        context: {
          orderId: orderDetails.id,
        },
      });
    }

    if (validPayments[0].paymentGateway === 'CASH_ON_DELIVERY') {
      const validatedBankData = validatedData.bankDetails;
      if (!validatedBankData) {
        throw new VestidoError({
          name: 'NotFoundError',
          message: 'Bank Details does not exist',
          httpStatus: 404,
          context: {
            bankDetails: validatedData.bankDetails,
          },
        });
      }
      await prisma.bankDetails.create({
        data: {
          returnId: returnOrder.id,
          customerId: validatedBankData.customerId,
          accountHolderName: validatedBankData.bankAccountHolderName,
          accountNumber: validatedBankData.bankAccountNumber,
          ifscCode: validatedBankData.bankIfscCode,
          mobile: validatedBankData.mobile,
        },
      });
    }

    const validatedMeasurements = ReturnPackageSchema.parse(fulfillmentDetails);

    const returnItems = returnOrder.returnItems.map((item) => ({
      name: item.orderItem.item.title,
      sku:
        item.orderItem.item.sku ||
        Math.floor(Math.random() * 1000000).toString(),
      units: item.qty,
      selling_price: item.orderItem.item.price,
      discount: item.orderItem.item.discountedPrice
        ? item.orderItem.item.price - item.orderItem.item.discountedPrice
        : 0,
      tax: item.orderItem.item.taxRate ?? 0,
      hsn: '',
      qc_enable: false,
    }));

    const firstPaymentGateway = validPayments[0].paymentGateway;
    const paymentMethod =
      firstPaymentGateway === 'CASH_ON_DELIVERY' ? 'COD' : 'Prepaid';

    const shiprocketReturnData = {
      order_id: returnOrder.id,
      order_date: returnOrder.createdAt,
      pickup_customer_name: orderDetails.shippingAddress.firstName,
      pickup_last_name: orderDetails.shippingAddress.lastName,
      pickup_address: orderDetails.shippingAddress.line1,
      pickup_address_2: `${orderDetails.shippingAddress.line2}${orderDetails.shippingAddress.landmark ? ', Landmark: ' + orderDetails.shippingAddress.landmark : ''}`,
      pickup_city: orderDetails.shippingAddress.district,
      pickup_state: orderDetails.shippingAddress.state,
      pickup_country: 'India',
      pickup_pincode: orderDetails.shippingAddress.pinCode,
      pickup_email: `${orderDetails.shippingAddress.mobile}@vestidonation.com`,
      pickup_phone: orderDetails.shippingAddress.mobile,
      return_items: returnItems,
      payment_method: paymentMethod,
      total_discount: 0,
      refund_amount: refundAmount,
      length: validatedMeasurements.length,
      breadth: validatedMeasurements.breadth,
      height: validatedMeasurements.height,
      weight: validatedMeasurements.weight,
    };

    const shiprocketReturnOrder =
      await createShiprocketReturnOrder(shiprocketReturnData);

    await prisma.returnLog.create({
      data: {
        returnId: returnOrder.id,
        logType: 'SHIPROCKET_RETURN_ORDER_RESPONSE',
        rawData: shiprocketReturnOrder,
      },
    });

    const returnOrderDetails = await prisma.return.update({
      where: {
        id: returnOrder.id,
      },
      data: {
        shipmentId: String(shiprocketReturnOrder.shipment_id),
      },
      include: {
        returnItems: true,
      },
    });

    if (validatedData.returnType === 'RETURN') {
      //Update Order if RETURN
      await prisma.order.update({
        where: {
          id: validatedData.orderId,
        },
        data: {
          returnStatus: 'RETURN_REQUESTED',
        },
      });

      //Update OrderItem if RETURN
      await Promise.all(
        returnOrder.returnItems.map((item) =>
          prisma.orderItem.update({
            where: {
              id: item.id,
            },
            data: {
              returnStatus: 'RETURN_REQUESTED',
            },
          }),
        ),
      );

      // TODO: Refund Only for Return
    }

    //Create new order if REPLACE
    let updatedReplacedOrder;
    if (validatedData.returnType === 'REPLACE') {
      //Update Order if RETURN
      await prisma.order.update({
        where: {
          id: validatedData.orderId,
        },
        data: {
          replacementStatus: 'REPLACEMENT_REQUESTED',
        },
      });

      //Update OrderItem if RETURN
      await Promise.all(
        returnOrder.returnItems.map((item) =>
          prisma.orderItem.update({
            where: {
              id: item.id,
            },
            data: {
              replacementStatus: 'REPLACEMENT_REQUESTED',
            },
          }),
        ),
      );

      const orderItems = returnOrder.returnItems.map((returnItem) => {
        const orderItem = returnItem.orderItem;

        return {
          itemId: orderItem.itemId,
          price: orderItem.price,
          qty: returnItem.qty,
          variantId: orderItem.variantId || null,
          taxTitle: orderItem.taxTitle || null,
          taxRate: orderItem.taxRate || 0,
          taxInclusive: orderItem.taxInclusive || false,
        };
      });

      // Define the type for newOrderData
      const newOrderData: {
        addressId: string;
        customerId: string;
        paymentType: 'CASH_ON_DELIVERY' | 'REPLACEMENT_ORDER' | 'ONLINE';
        orderItems: {
          itemId: string;
          price: number;
          qty: number;
          variantId: string | null;
          taxTitle: string | null;
          taxRate: number;
          taxInclusive: boolean;
        }[];
      } = {
        addressId: orderDetails.addressId,
        customerId: orderDetails.customerId,
        paymentType: 'REPLACEMENT_ORDER',
        orderItems: orderItems,
      };

      const replacedOrder = await createOrder(newOrderData);

      updatedReplacedOrder = await prisma.order.update({
        where: {
          id: replacedOrder.order.id,
        },
        data: {
          isReplacement: true,
          parentOrderId: orderDetails.id,
        },
      });
    }
    return { returnOrderDetails, updatedReplacedOrder };
  });
  return result;
}
