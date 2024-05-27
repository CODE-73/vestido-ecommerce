import { PrismaClient } from '@prisma/client';

export async function deleteVariant(variantId: string) {
  const prisma = new PrismaClient();

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
