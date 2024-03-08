import { PrismaClient } from '@prisma/client';

export async function deleteItem(itemId: string) {
  const prisma = new PrismaClient();

  const item = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });
  // no try..catch here

  return item;
}
