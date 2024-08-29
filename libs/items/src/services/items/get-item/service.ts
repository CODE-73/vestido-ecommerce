import { populateImageURLs } from '@vestido-ecommerce/caching';
import {
  getPrismaClient,
  PrismaTransactionalClient,
} from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function getItemDetails(
  itemId: string,
  _prisma?: PrismaTransactionalClient,
) {
  const prisma = _prisma ?? getPrismaClient();

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
