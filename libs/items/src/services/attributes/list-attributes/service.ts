import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListAttributesArgs } from './types';
import { ListAttributeRequestSchema } from './zod';

export async function listAttribute(_args: ListAttributesArgs) {
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
