import { PrismaClient } from '@prisma/client';

export async function listItem() {
  const prisma = new PrismaClient();
  // pass to prisma next

  const itemList = await prisma.item.findMany({
    include: {
      category: true,
    },
  });
  // no try..catch here

  return itemList;
}
