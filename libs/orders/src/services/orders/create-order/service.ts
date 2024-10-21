import { getPrismaClient } from '@vestido-ecommerce/models';

import { calculateTotal } from '../calculate-total';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  const { addressId, customerId, paymentType, couponCode, ...data } =
    CreateOrderSchema.parse(_data);

  console.log('data: ', _data);

  const {
    shippingCharges,
    itemsPrice,
    totalTax,
    discount,
    grandTotal,
    itemsWithTax,
  } = await calculateTotal({
    addressId: addressId,
    orderItems: _data.orderItems,
    paymentType,
    couponCode,
  });

  const newOrder = await prisma.order.create({
    data: {
      ...data,
      dateTime: new Date(),
      orderStatus: 'PENDING',
      totalPrice: itemsPrice - totalTax,
      totalTax: totalTax,
      totalCharges: shippingCharges,
      discount: discount,
      grandTotal: grandTotal,
      coupon: couponCode,
      customer: {
        connect: {
          id: customerId,
        },
      },
      shippingAddress: {
        connect: {
          id: addressId,
        },
      },
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
            taxAmount: item.taxAmount, // Added taxAmount here
          })),
        },
      },
    },
  });

  let newPayment = null;
  if (paymentType == 'CASH_ON_DELIVERY') {
    newPayment = await prisma.payment.create({
      data: {
        order: {
          connect: {
            id: newOrder.id,
          },
        },
        paymentGateway: 'CASH_ON_DELIVERY',
        paymentGatewayRef: 'Null',
        moreDetails: 'Null',
        currency: 'INR',
        amount: grandTotal,
        status: 'PENDING',
      },
    });

    // Clear Cart on Confirmation
    await prisma.cartItem.deleteMany({
      where: {
        customerId: customerId,
        itemId: {
          in: data.orderItems.map((item) => item.itemId),
        },
      },
    });
  }

  return {
    order: newOrder,
    payment: newPayment,
  };
  /**
   * return {
   *  order: newOrder,
   *  paymentGateway: "",
   *  paymentGatewayArgs: {
   *     ...
   *  }
   * }
   */
}
