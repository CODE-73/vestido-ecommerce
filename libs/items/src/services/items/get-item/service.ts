import { validate as isUUID } from 'uuid';

import { populateImageURLs } from '@vestido-ecommerce/caching';
import {
  getPrismaClient,
  PrismaTransactionalClient,
} from '@vestido-ecommerce/models';
import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

export async function getItemDetails(
  idOrSlug: string,
  _prisma?: PrismaTransactionalClient,
) {
  const prisma = _prisma ?? getPrismaClient();

  const item = await prisma.item.findUnique({
    where: isUUID(idOrSlug) ? { id: idOrSlug } : { slug: idOrSlug },
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
      message: `Item ${idOrSlug} not found`,
      httpStatus: 404,
      context: {
        identifier: idOrSlug,
      },
    });
  }

  await populateImageURLs(item?.images as ImageSchemaType[]);

  return item;
}
