import { getPrismaClient } from '@vestido-ecommerce/models';
import { AddToCartSchema, AddToCartSchemaType } from './zod';

export async function addToCart(body: AddToCartSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = AddToCartSchema.parse(body);

  const cartItem = await prisma.cartItem.create({
    data: {
      qty: validatedData.qty,
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
