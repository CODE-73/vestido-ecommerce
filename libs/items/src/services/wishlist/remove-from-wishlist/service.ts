import { getPrismaClient } from '@vestido-ecommerce/models';
import { RemoveFromWishlistSchema, RemoveFromWishlistSchemaType } from './zod';

export async function removeFromWishlist(body: RemoveFromWishlistSchemaType) {
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
