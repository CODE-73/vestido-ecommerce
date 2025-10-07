import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
export async function listCartItems(customerId: string) {
  const prisma = getPrismaClient();

  const cartItems = await prisma.cartItem.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      item: {
        select: {
          title: true,
          description: true,
          price: true,
          discountedPrice: true,
          discountPercent: true,
          stockStatus: true,
          images: true,
          taxInclusive: true,
          taxRate: true,
          taxTitle: true,
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
    orderBy: {
      createdAt: 'asc',
    },
  });

  await populateImageURLs(
    cartItems.flatMap((item) => [
      ...((item.variant?.images ?? []) as ImageSchemaType[]),
      ...((item.item.images ?? []) as ImageSchemaType[]),
    ]),
  );

  return cartItems;
}
