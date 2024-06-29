import { PrismaClient } from '@prisma/client';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';
import { calculateShippingCharges } from '../../shipping/get-shipping-charge';

export async function createOrder(_data: CreateOrderSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const { addressId, customerId, ...data } = CreateOrderSchema.parse(_data);
  // pass to prisma next

  const shipping = await calculateShippingCharges({
    paymentType: data.paymentType,
    shippingAddressId: addressId,
  });

  const shippingCharges = shipping.shippingCost ?? 0;

  const itemsPrice =
    data.orderItems?.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0) ?? 0;

  const newOrder = await prisma.order.create({
    data: {
      ...data,
      dateTime: new Date(),
      status: 'PENDING',
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

  return newOrder;
}
