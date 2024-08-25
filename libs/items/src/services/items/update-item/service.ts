import { Gender } from '@prisma/client';

import { addThumbhashToImages } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';

import { validateSlug } from '../../slug';
import { UpdateItemSchema, UpdateItemSchemaType } from './zod';

export async function updateItem(itemId: string, data: UpdateItemSchemaType) {
  const prisma = getPrismaClient();

  // validate zod here
  const validatedData = UpdateItemSchema.parse(data);
  validatedData.slug = await validateSlug({
    id: itemId,
    generateFrom: validatedData.title,
    slug: validatedData.slug,
    tableName: 'item',
  });

  if (validatedData.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    });

    const categoryGenders = category?.gender as Gender[];
    const itemGenders = validatedData.gender;

    const isSubset = itemGenders.every((gender) =>
      categoryGenders.includes(gender),
    );

    if (!isSubset) {
      throw new Error(
        "The genders of a product must be a subset of its category's genders.",
      );
    }
  }

  await addThumbhashToImages(validatedData.images);

  const updatedItem = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      ...validatedData,
    },
  });

  return updatedItem;
}
