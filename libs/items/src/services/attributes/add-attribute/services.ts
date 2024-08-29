import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateAttributeSchema, CreateAttributeSchemaType } from './zod';

export async function createAttribute(body: CreateAttributeSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateAttributeSchema.parse(body);

  const newAttribute = await prisma.itemAttribute.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      values: {
        createMany: {
          data: validatedData.itemAttributeValues ?? [],
        },
      },
    },
  });

  return newAttribute;
}
