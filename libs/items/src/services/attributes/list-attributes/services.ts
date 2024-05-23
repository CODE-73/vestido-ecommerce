import { PrismaClient } from '@prisma/client';

export async function listAttribute() {
  const prisma = new PrismaClient();

  const listAttribute = await prisma.itemAttribute.findMany({
    include: {
      ItemAttributeValues: true,
    },
  });

  return listAttribute;
}
