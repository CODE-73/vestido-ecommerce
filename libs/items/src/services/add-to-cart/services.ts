import { PrismaClient } from '@prisma/client';
import { AddToCartSchema, AddToCartSchemaType } from './zod';

export async function addToCart(body: AddToCartSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = AddToCartSchema.parse(body);

  const cartItem = await prisma.cartItem.create({
    data: {
      customer: {
        connect: {
          id: validatedData.customerId,
        },
      },
      item: {
        connect: {
          id: validatedData.itemId,
        },
      },
    },
  });

  return cartItem;
}
