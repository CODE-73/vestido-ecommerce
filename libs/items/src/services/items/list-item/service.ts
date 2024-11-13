import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { ListItemRequest } from './types';
import { ListItemRequestSchema } from './zod';

export async function listItem(_args: ListItemRequest) {
  const prisma = getPrismaClient();
  const args = ListItemRequestSchema.parse(_args);
  // pass to prisma next

  const itemList = await prisma.item.findMany({
    where: {
      ...(args?.enabled !== undefined
        ? {
            enabled: args.enabled ?? false,
          }
        : {}),

      ...(args?.categoryId
        ? {
            categoryId: args.categoryId,
          }
        : {}),
      ...(args?.q
        ? {
            OR: [
              { title: { contains: args.q, mode: 'insensitive' } },
              { description: { contains: args.q } },
              //add more fields if required
            ],
          }
        : {}),
    },

    include: {
      category: true,
      variants: {
        where: {
          // We will always fetch disabled variants as well.
          // enabled: true,
        },
      },
    },
  });

  await populateImageURLs(
    itemList.flatMap((x) => [
      ...(x.variants?.flatMap((v) => (v.images ?? []) as ImageSchemaType[]) ??
        []),
      ...((x.images ?? []) as ImageSchemaType[]),
    ]),
  );

  return itemList;
}
