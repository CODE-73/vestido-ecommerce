import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listWishlistItems(customerId: string) {
  const prisma = getPrismaClient();

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
          stockStatus: true,
          images: true,
        },
      },
    },
  });

  return wishlistItems;
}
