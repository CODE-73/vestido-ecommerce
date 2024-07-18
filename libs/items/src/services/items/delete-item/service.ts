import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteItem(itemId: string) {
  const prisma = getPrismaClient();

  const variantIds = await prisma.itemVariant.findMany({
    where: {
      itemId: itemId,
    },
    select: {
      id: true,
    },
  });

  const variantIdArray = variantIds.map((variant) => variant.id);

  await prisma.$transaction(async (prisma) => {
    await prisma.variantAttributeValue.deleteMany({
      where: {
        variantId: {
          in: variantIdArray,
        },
      },
    });
    await prisma.itemVariant.deleteMany({
      where: {
        itemId: itemId,
      },
    });
    const deletedItem = await prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    return deletedItem;
  });
}
