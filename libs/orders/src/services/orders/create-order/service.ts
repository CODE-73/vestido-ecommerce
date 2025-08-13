import type { Payment } from '@prisma/client';

import { sendSMS, SMSSenderID, SMSTemplate } from '@vestido-ecommerce/fast2sms';
import { clearCartOnOrderCreation } from '@vestido-ecommerce/items';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { calculateTotal } from '../calculate-total';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  const { addressId, customerId, paymentType, couponCode, ...data } =
    CreateOrderSchema.parse(_data);

  const shippingdetails = await prisma.customerAddress.findUnique({
    where: { id: addressId },
  });

  const {
    shippingCharges,
    itemsPrice,
    totalTax,
    couponDiscount,
    grandTotal,
    itemsWithTax,
  } = await calculateTotal({
    addressId,
    orderItems: _data.orderItems,
    paymentType,
    couponCode,
  });

  // Transaction: returns the created order + payment
  const { newOrder, newPayment } = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        ...data,
        createdAt: new Date(),
        orderStatus:
          paymentType === 'CASH_ON_DELIVERY' ? 'CONFIRMED' : 'PENDING',
        totalPrice: itemsPrice - totalTax,
        totalTax,
        totalCharges: shippingCharges,
        totalDiscount: couponDiscount,
        grandTotal,
        couponCode,
        customer: { connect: { id: customerId } },
        shippingAddress: { connect: { id: addressId } },
        orderItems: {
          createMany: {
            data: itemsWithTax.map((item) => ({
              itemId: item.itemId,
              price: item.price,
              qty: item.qty,
              variantId: item.variantId,
              taxTitle: item.taxTitle,
              taxRate: item.taxRate,
              taxInclusive: item.taxInclusive,
              taxAmount: item.taxAmount,
              status:
                paymentType === 'CASH_ON_DELIVERY' ? 'CONFIRMED' : 'PENDING',
            })),
          },
        },
      },
    });

    let newPayment: Payment | null = null;

    if (paymentType === 'CASH_ON_DELIVERY') {
      newPayment = await tx.payment.create({
        data: {
          order: { connect: { id: newOrder.id } },
          paymentGateway: 'CASH_ON_DELIVERY',
          paymentGatewayRef: 'Null',
          moreDetails: 'Null',
          currency: 'INR',
          amount: grandTotal,
          status: 'PENDING',
        },
      });
    } else if (paymentType === 'REPLACEMENT_ORDER') {
      newPayment = await tx.payment.create({
        data: {
          order: { connect: { id: newOrder.id } },
          paymentGateway: 'REPLACEMENT_ORDER',
          paymentGatewayRef: 'Null',
          moreDetails: 'Null',
          currency: 'INR',
          amount: 0,
          status: 'CAPTURED',
        },
      });
    }

    return { newOrder, newPayment };
  });

  // ==== Side effects (outside transaction) ====
  if (paymentType === 'CASH_ON_DELIVERY') {
    const totalItems = itemsWithTax
      .reduce((sum, item) => sum + item.qty, 0)
      .toString();

    if (!IS_DEVELOPMENT) {
      try {
        const mobile = shippingdetails?.mobile ?? '';
        if (mobile) {
          await sendSMS({
            senderId: SMSSenderID.BVSTID,
            template: SMSTemplate.ORDER_PLACED_SMS,
            variables: [newOrder.order_no.toString(), totalItems],
            recipients: [mobile],
          });
        }
      } catch (e) {
        throw new VestidoError({
          name: 'SendOTPFailed',
          message: 'Failed to send ORDER_PLACED_SMS',
          httpStatus: 500,
          context: { newOrder, error: e },
        });
      }
    }

    await clearCartOnOrderCreation(newOrder.id);
  }

  return { order: newOrder, payment: newPayment };
}
