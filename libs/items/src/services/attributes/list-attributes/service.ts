import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListAttributesRequest } from './types';
import { ListAttributeRequestSchema } from './zod';

export async function listAttribute(_args: ListAttributesRequest) {
  const prisma = getPrismaClient();
  const args = ListAttributeRequestSchema.parse(_args ?? {});

  const listAttribute = await prisma.itemAttribute.findMany({
    include: {
      values: true,
    },
    ...(args?.q
      ? {
          where: {
            OR: [{ name: { contains: args.q, mode: 'insensitive' } }],
          },
        }
      : {}),
  });

  return listAttribute;
}
