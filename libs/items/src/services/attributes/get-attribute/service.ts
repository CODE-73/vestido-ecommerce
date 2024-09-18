import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getAttribute(attributeId: string) {
  const prisma = getPrismaClient();

  const attribute = await prisma.itemAttribute.findUnique({
    where: {
      id: attributeId,
    },
    include: {
      values: true,
    },
  });

  return attribute;
}
