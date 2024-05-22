import { PrismaClient } from '@prisma/client';
import { RemoveFromWishlistSchema, RemoveFromWishlistSchemaType } from './zod';

export async function removeFromWishlist(body: RemoveFromWishlistSchemaType) {
  const prisma = new PrismaClient();

  const validatedData = RemoveFromWishlistSchema.parse(body);

  const wishlistItem = await prisma.wishlistItem.deleteMany({
    where: {
      customerId: validatedData.customerId,
      itemId: validatedData.itemId,
    },
  });

  return wishlistItem;
}
