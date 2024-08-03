import { getPrismaClient } from '@vestido-ecommerce/models';

import { AddToWishlistSchema, AddToWishlistSchemaType } from './zod';

export async function addToWishlist(data: AddToWishlistSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = AddToWishlistSchema.parse(data);
  const existingWishlistItem = await prisma.wishlistItem.findFirst({
    where: {
      customerId: validatedData.customerId,
      itemId: validatedData.itemId,
    },
  });

  if (existingWishlistItem) {
    // Item is already in the wishlist, return the existing item
    return existingWishlistItem;
  } else {
    const wishlistItem = await prisma.wishlistItem.create({
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

    // no try..catch here

    return wishlistItem;
  }
}
