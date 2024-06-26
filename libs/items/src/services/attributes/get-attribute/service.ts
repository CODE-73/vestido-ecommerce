import { PrismaClient } from '@prisma/client';

export async function attributeDetails(attributeId: string) {
  const prisma = new PrismaClient();

  const attribute = await prisma.itemAttribute.findUnique({
    where: {
      id: attributeId,
    },
    include: {
      ItemAttributeValues: true,
    },
  });
  // no try..catch here

  return attribute;
}
