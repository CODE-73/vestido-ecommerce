import { PrismaClient } from '@prisma/client';
import { RemoveFromCartSchema, RemoveFromCartSchemaType } from './zod';

export async function removeFromCart(body: RemoveFromCartSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = RemoveFromCartSchema.parse(body);

  // const qty = await prisma.cartItem.findMany({
  //   where: {
  //     itemId: validatedData.itemId,
  //     customerId: validatedData.customerId,
  //   },
  // })
  // if (qty >1){

  // }

  const cartItem = await prisma.cartItem.deleteMany({
    where: {
      itemId: validatedData.itemId,
      customerId: validatedData.customerId,
    },
  });

  return cartItem;
}
