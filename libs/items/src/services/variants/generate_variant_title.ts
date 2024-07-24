import { type PrismaClient } from '@prisma/client';
export async function generateVariantTitle(
  client: PrismaClient,
  attributes: Array<{ attributeId: string; attributeValueId: string }>
) {
  const attributeNames: string[] = [];

  for (const attr of attributes) {
    const attributeValue = await client.itemAttributeValue.findUnique({
      where: {
        id: attr.attributeValueId,
      },
      select: {
        value: true,
      },
    });

    if (attributeValue) {
      attributeNames.push(attributeValue.value);
    }
  }

  return attributeNames.join(', ');
}
