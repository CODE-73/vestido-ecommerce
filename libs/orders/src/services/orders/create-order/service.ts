import { getPrismaClient } from '@vestido-ecommerce/models';

import { calculateShippingCharges } from '../../shipping/get-shipping-charge';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const { addressId, customerId, paymentType, ...data } =
    CreateOrderSchema.parse(_data);
  // pass to prisma next

  const shipping = await calculateShippingCharges({
    paymentType: paymentType,
    shippingAddressId: addressId,
  });

  const shippingCharges = shipping.shippingCost ?? 0;

  const itemsPrice =
    data.orderItems?.reduce((total, item) => {
      return total + (item.qty ?? 1) * item.price;
    }, 0) ?? 0;

  const newOrder = await prisma.order.create({
    data: {
      ...data,
      dateTime: new Date(),
      orderStatus: 'PENDING',
      totalPrice: itemsPrice + shippingCharges,
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
          data: data.orderItems,
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
        amount: itemsPrice + shippingCharges,
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
