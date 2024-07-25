import { getPrismaClient } from '@vestido-ecommerce/models';

import { RemoveFromCartSchema, RemoveFromCartSchemaType } from './zod';

export async function removeFromCart(body: RemoveFromCartSchemaType) {
  const prisma = getPrismaClient();

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
