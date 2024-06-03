import { PrismaClient } from '@prisma/client';

export async function listWishlistItems(customerId: string) {
  const prisma = new PrismaClient();

  const wishlistItems = await prisma.wishlistItem.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      item: {
        select: {
          title: true,
          description: true,
          price: true,
          unit: true,
          stock: true,
        },
      },
    },
  });
  // no try..catch here

  return wishlistItems;
}
