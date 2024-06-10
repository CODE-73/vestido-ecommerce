import { PrismaClient } from '@prisma/client';
import { CreateVariantSchema, CreateVariantSchemaType } from './zod';
import { variantDetails } from '../get-variant';
import { validateAttributes } from '../validate_attributes';
import { generateVariantTitle } from '../generate_variant_title';

export async function createVariant(data: CreateVariantSchemaType) {
  const prisma = new PrismaClient();

  // validate zod here
  const validatedData = CreateVariantSchema.parse(data);
  // pass to prisma next

  await validateAttributes(prisma, validatedData.attributeValues ?? []);
  const varTitle = await generateVariantTitle(
    prisma,
    validatedData.attributeValues ?? []
  );
  console.log(varTitle);
  const newVariant = await prisma.itemVariant.create({
    data: {
      // itemId: validatedData.itemId,
      // price: validatedData.price,
      ...validatedData,
      title: varTitle,
      attributeValues: {
        createMany: {
          data: validatedData.attributeValues ?? [],
        },
      },
    },
  });
  return await variantDetails(newVariant.id);
}
