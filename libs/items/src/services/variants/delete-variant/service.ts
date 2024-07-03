import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteVariant(variantId: string) {
  const prisma = getPrismaClient();

  await prisma.$transaction(async (prisma) => {
    await prisma.variantAttributeValue.deleteMany({
      where: {
        variantId: variantId,
      },
    });
    await prisma.itemVariant.delete({
      where: {
        id: variantId,
      },
    });
  });
}
