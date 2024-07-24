import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

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
      variant: {
        select: {
          id: true,
          title: true,
          price: true,
          stockStatus: true,
          images: true,
        },
      },
    },
  });

  await populateImageURLs(
    wishlistItems.flatMap((item) => [
      ...((item.variant?.images ?? []) as ImageSchemaType[]),
      ...((item.item.images ?? []) as ImageSchemaType[]),
    ])
  );

  return wishlistItems;
}
