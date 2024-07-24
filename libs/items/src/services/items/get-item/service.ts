import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function itemDetails(itemId: string) {
  const prisma = getPrismaClient();

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      variants: {
        include: {
          attributeValues: {
            include: {
              attribute: true,
              attributeValue: true,
            },
          },
        },
      },
    },
  });

  await populateImageURLs(item?.images as ImageSchemaType[]);

  return item;
}
