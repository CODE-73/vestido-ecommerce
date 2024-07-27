import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listVariants(itemId: string) {
  const prisma = getPrismaClient();
  // pass to prisma next

  const itemVariantList = await prisma.itemVariant.findMany({
    where: {
      itemId: itemId,
      enabled: true,
    },
  });
  // no try..catch here

  return itemVariantList;
}
