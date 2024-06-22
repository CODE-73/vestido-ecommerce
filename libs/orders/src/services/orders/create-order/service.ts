import { PrismaClient } from '@prisma/client';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createOrder(data: CreateOrderSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateOrderSchema.parse(data);
  // pass to prisma next

  const newOrder = await prisma.order.create({
    data: {
      ...validatedData,
      orderItems: {
        createMany: {
          data: validatedData.orderItems,
        },
      },
    },
  });

  return newOrder;
}
