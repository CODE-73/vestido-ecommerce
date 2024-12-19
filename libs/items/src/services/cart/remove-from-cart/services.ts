import { getPrismaClient } from '@vestido-ecommerce/models';

import { RemoveFromCartSchema } from './zod';

export async function removeFromCart(body: unknown) {
  const prisma = getPrismaClient();
  const validatedData = RemoveFromCartSchema.parse(body);

  if (validatedData.actionType !== 'decrement') {
    // Full removal of the item
    const cartItem = await prisma.cartItem.deleteMany({
      where: {
        itemId: validatedData.itemId,
        customerId: validatedData.customerId,
        variantId: validatedData.variantId,
      },
    });
    return cartItem;
  } else {
    // Decrement quantity by 1
    const cartItem = await prisma.cartItem.updateMany({
      where: {
        itemId: validatedData.itemId,
        customerId: validatedData.customerId,
        variantId: validatedData.variantId,
        qty: {
          gt: 1,
        },
      },
      data: {
        qty: {
          decrement: 1,
        },
      },
    });

    // If no records were updated (quantity was 1), remove the item
    if (cartItem.count === 0) {
      const deletedItem = await prisma.cartItem.deleteMany({
        where: {
          itemId: validatedData.itemId,
          customerId: validatedData.customerId,
          variantId: validatedData.variantId,
        },
      });
      return deletedItem;
    }

    return cartItem;
  }
}
