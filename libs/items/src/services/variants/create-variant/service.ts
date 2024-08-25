import { addThumbhashToImages } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';

import { validateSlug } from '../../slug';
import { generateVariantTitle } from '../generate_variant_title';
import { variantDetails } from '../get-variant';
import { validateAttributes } from '../validate_attributes';
import { CreateVariantSchema, CreateVariantSchemaType } from './zod';

export async function createVariant(data: CreateVariantSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = CreateVariantSchema.parse(data);
  // pass to prisma next

  await validateAttributes(prisma, validatedData.attributeValues ?? []);
  const varTitle = await generateVariantTitle(
    prisma,
    validatedData.attributeValues ?? [],
  );
  validatedData.slug = await validateSlug({
    generateFrom: varTitle,
    slug: validatedData.slug,
    tableName: 'itemVariant',
  });

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

  await addThumbhashToImages(validatedData.images);

  const newVariant = await prisma.itemVariant.create({
    data: {
      // itemId: validatedData.itemId,
      // price: validatedData.price,
      ...validatedData,
      slug: validatedData.slug ?? '',
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
