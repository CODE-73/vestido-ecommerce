import { clearCartOnOrderCreation } from '@vestido-ecommerce/items';
import { getPrismaClient } from '@vestido-ecommerce/models';

import { calculateTotal } from '../calculate-total';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  const { addressId, customerId, paymentType, couponCode, ...data } =
    CreateOrderSchema.parse(_data);

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
      /**
       * For Cash on Delivery, the order status is set to CONFIRMED immediately.
       * We are anticipating an error from the payment gateway, hence setting the order status to PENDING.
       */
      orderStatus: paymentType == 'CASH_ON_DELIVERY' ? 'CONFIRMED' : 'PENDING',
      totalPrice: itemsPrice - totalTax,
      totalTax: totalTax,
      totalCharges: shippingCharges,
      totalDiscount: discount,
      grandTotal: grandTotal,
      couponCode: couponCode,
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
            status: paymentType == 'CASH_ON_DELIVERY' ? 'CONFIRMED' : 'PENDING',
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
    await clearCartOnOrderCreation(newOrder.id);
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
