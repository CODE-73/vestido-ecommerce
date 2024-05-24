import { PrismaClient } from '@prisma/client';

export async function deleteAttribute(attributeId: string) {
  const prisma = new PrismaClient();

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
