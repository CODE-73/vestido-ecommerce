import { type PrismaClient } from '@prisma/client';

export async function validateAttributes(
  client: PrismaClient,
  attributes: Array<{ attributeId: string; attributeValueId: string }>
) {
  // Validate no two duplicate attribute values are mentioned under the same attributeId
  if (
    new Set(attributes.map((x) => x.attributeId)).size !== attributes.length
  ) {
    throw new Error('An Attribute can only be specified once');
  }

  // Validate attributeValueId belongs to attributeId
  const values = await client.itemAttributeValue.findMany({
    where: {
      attributeId: {
        in: attributes.map((x) => x.attributeId),
      },
    },
  });

  for (const attr of attributes) {
    if (
      !values.find(
        (x) =>
          x.attributeId === attr.attributeId && x.id === attr.attributeValueId
      )
    ) {
      throw new Error('Attribute values incompatible');
    }
  }

  return true;
}
