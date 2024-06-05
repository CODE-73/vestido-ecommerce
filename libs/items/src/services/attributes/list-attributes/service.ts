import { PrismaClient } from '@prisma/client';
import { ListAttributesRequest } from './types';
import { ListAttributeRequestSchema } from './zod';

export async function listAttribute(_args: ListAttributesRequest) {
  const prisma = new PrismaClient();
  const args = ListAttributeRequestSchema.parse(_args ?? {});

  const listAttribute = await prisma.itemAttribute.findMany({
    include: {
      ItemAttributeValues: true,
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
