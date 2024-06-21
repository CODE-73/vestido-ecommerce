import { PrismaClient } from '@prisma/client';
import { CreateOrderSchema, CreateOrderSchemaType } from './zod';

export async function createItem(data: CreateOrderSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateOrderSchema.parse(data);
  // pass to prisma next

  const newItem = await prisma.order.create({
    data: {
      ...validatedData,
      orderItems: {
        createMany: {
          data: validatedData.orderItems,
        },
      },
    },
  });
  // no try..catch here

  return newItem;
}
