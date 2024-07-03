import { getPrismaClient } from '@vestido-ecommerce/models';

export async function variantDetails(variantId: string) {
  const prisma = getPrismaClient();

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
