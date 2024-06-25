import { PrismaClient } from '@prisma/client';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(data: CreateOrderSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const { addressId, customerId, ...validatedData } =
    CreateOrderSchema.parse(data);
  // pass to prisma next

  const newOrder = await prisma.order.create({
    data: {
      ...validatedData,
      status: 'PENDING',
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
          data: validatedData.orderItems,
        },
      },
    },
  });

  return newOrder;
}
