import { getPrismaClient } from '@vestido-ecommerce/models';
export async function attributeDetails(attributeId: string) {
  const prisma = getPrismaClient();

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
