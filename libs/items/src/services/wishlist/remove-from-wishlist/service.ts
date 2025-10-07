import { getPrismaClient } from '@vestido-ecommerce/models';

import { RemoveFromWishlistArgs } from './types';
import { RemoveFromWishlistSchema } from './zod';

export async function removeFromWishlist(body: RemoveFromWishlistArgs) {
  const prisma = getPrismaClient();

  const validatedData = RemoveFromWishlistSchema.parse(body);

  const wishlistItem = await prisma.wishlistItem.deleteMany({
    where: {
      customerId: validatedData.customerId,
      itemId: validatedData.itemId,
    },
  });

  return wishlistItem;
}
