import { PrismaClient } from '@prisma/client';
import { ListItemRequest } from './types';
import { ListItemRequestSchema } from './zod';

export async function listItem(_args: ListItemRequest) {
  const prisma = new PrismaClient();
  const args = ListItemRequestSchema.parse(_args);
  // pass to prisma next

  const itemList = await prisma.item.findMany({
    ...(args?.q
      ? {
          where: {
            OR: [
              { title: { contains: args.q, mode: 'insensitive' } }, // Example field to search
              { description: { contains: args.q } }, // Another example field to search
            ],
          },
        }
      : {}),
    include: {
      category: true,
    },
  });
  // no try..catch here

  return itemList;
}
