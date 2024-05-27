import { PrismaClient } from '@prisma/client';

export async function variantDetails(variantId: string) {
  const prisma = new PrismaClient();

  const variant = await prisma.itemVariant.findUnique({
    where: {
      id: variantId,
    },
    include: {
      attributeValues: true,
    },
  });
  // no try..catch here

  return variant;
}
