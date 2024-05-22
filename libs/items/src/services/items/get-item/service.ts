import { PrismaClient } from '@prisma/client';

export async function itemDetails(itemId: string) {
  const prisma = new PrismaClient();

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });
  // no try..catch here

  return item;
}
