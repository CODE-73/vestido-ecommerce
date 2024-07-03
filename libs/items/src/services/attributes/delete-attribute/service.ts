import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteAttribute(attributeId: string) {
  const prisma = getPrismaClient();

  await prisma.$transaction(async (prisma) => {
    await prisma.itemAttributeValue.deleteMany({
      where: {
        attributeId: attributeId,
      },
    });
    const deletedAttribute = await prisma.itemAttribute.delete({
      where: {
        id: attributeId,
      },
    });
    return deletedAttribute;
  });
}
