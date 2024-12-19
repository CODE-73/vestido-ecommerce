import { type PrismaClient } from '@prisma/client';

import { VestidoError } from '@vestido-ecommerce/utils';

export async function validateAttributes(
  client: PrismaClient,
  attributes: Array<{ attributeId: string; attributeValueId: string }>,
) {
  // Validate no two duplicate attribute values are mentioned under the same attributeId
  if (
    new Set(attributes.map((x) => x.attributeId)).size !== attributes.length
  ) {
    throw new VestidoError({
      name: 'DuplicateAttributeValue',
      message: 'An Attribute can only be specified once',
      httpStatus: 400,
      context: {
        attributes,
      },
    });
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
          x.attributeId === attr.attributeId && x.id === attr.attributeValueId,
      )
    ) {
      throw new VestidoError({
        name: 'AttributeValueIncompatible',
        message: 'Attribute values incompatible',
        httpStatus: 400,
        context: {
          attributes,
        },
      });
    }
  }

  return true;
}
