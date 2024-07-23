import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateVariantSchema, CreateVariantSchemaType } from './zod';
import { variantDetails } from '../get-variant';
import { validateAttributes } from '../validate_attributes';
import { generateVariantTitle } from '../generate_variant_title';

export async function createVariant(data: CreateVariantSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = CreateVariantSchema.parse(data);
  // pass to prisma next

  await validateAttributes(prisma, validatedData.attributeValues ?? []);
  const varTitle = await generateVariantTitle(
    prisma,
    validatedData.attributeValues ?? []
  );

  if (validatedData.default) {
    // Update all existing addresses to set default to false
    await prisma.itemVariant.updateMany({
      where: {
        itemId: validatedData.itemId,
        default: true,
      },
      data: {
        default: false,
      },
    });
  }

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
