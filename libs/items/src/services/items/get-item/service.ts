import { populateImageURLs } from '@vestido-ecommerce/caching';
import {
  getPrismaClient,
  PrismaTransactionalClient,
} from '@vestido-ecommerce/models';
import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

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
        where: {
          // We will always fetch disabled variants as well.
          // enabled: true,
        },
      },
    },
  });

  if (!item) {
    throw new VestidoError({
      name: 'ItemNotFound',
      message: `Item ${itemId} not found`,
      httpStatus: 404,
      context: {
        itemId,
      },
    });
  }

  await populateImageURLs(item?.images as ImageSchemaType[]);

  return item;
}
