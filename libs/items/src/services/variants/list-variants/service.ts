import { PrismaClient } from '@prisma/client';

export async function listVariants(itemId: string) {
  const prisma = new PrismaClient();
  // pass to prisma next

  const itemVariantList = await prisma.itemVariant.findMany({
    where: {
      itemId: itemId,
    },
  });
  // no try..catch here

  return itemVariantList;
}
