import { PrismaClient } from '@prisma/client';
import { CreateVariantSchema, CreateVariantSchemaType } from './zod';

export async function createVariant(data: CreateVariantSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateVariantSchema.parse(data);
  // pass to prisma next

  const newVariant = await prisma.itemVariant.create({
    data: {
      itemId: validatedData.itemId,
      attributeValues: {
        createMany: {
          data: validatedData.attributeValues ?? [],
        },
      },
    },
  });

  console.log('newVariant is', newVariant);
  // no try..catch here

  return newVariant;
}
