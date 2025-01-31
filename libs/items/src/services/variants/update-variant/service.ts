import { addThumbhashToImages } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';

import { validateSlug } from '../../slug';
import { generateVariantTitle } from '../generate_variant_title';
import { variantDetails } from '../get-variant';
import { validateAttributes } from '../validate_attributes';
import { UpdateVariantSchema, UpdateVariantSchemaType } from './zod';

export async function updateVariant(
  variantId: string,
  data: UpdateVariantSchemaType,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateVariantSchema.parse(data);
  await validateAttributes(prisma, validatedData.attributeValues ?? []);
  const varTitle = await generateVariantTitle(
    prisma,
    validatedData.attributeValues ?? [],
  );
  validatedData.slug = await validateSlug({
    id: variantId,
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

  await prisma.$transaction(async (prisma) => {
    // Update ItemVariants fields( except variantAttributeValues)
    await prisma.itemVariant.update({
      where: {
        id: variantId,
      },
      data: {
        ...validatedData,
        title: varTitle,
        attributeValues: {
          createMany: {
            data: validatedData.attributeValues ?? [],
          },
        },
      },
    });

    // Get Existing DB Ids
    const currentValues = await prisma.variantAttributeValue.findMany({
      where: { variantId: variantId },
    });

    const dbIds = Array.from(new Set(currentValues.map((value) => value.id)));
    const incomingIds = new Set(
      validatedData.attributeValues
        ?.map((value) => value.id)
        .filter((id) => !!id),
    );

    // Delete VariantAttributeValues that are not in the request
    const idsToDelete = dbIds.filter((id) => !incomingIds.has(id));
    if (idsToDelete.length > 0) {
      await prisma.variantAttributeValue.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    // Upsert VariantAttributeValues

    if (validatedData.attributeValues) {
      for (const value of validatedData.attributeValues) {
        if (value.id) {
          // Update existing variantAttributeValue
          await prisma.variantAttributeValue.update({
            where: { id: value.id },
            data: {
              attributeId: value.attributeId,
              attributeValueId: value.attributeValueId,
            },
          });
        } else {
          // Create new variantAttributeValue
          await prisma.variantAttributeValue.create({
            data: {
              attributeId: value.attributeId!,
              attributeValueId: value.attributeValueId!,
              variantId: variantId,
            },
          });
        }
      }
    }
  });
  const r = await variantDetails(variantId);

  return r;
}
