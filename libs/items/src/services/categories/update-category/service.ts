import { Gender } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { validateSlug } from '../../slug';
import { UpdateCategoryRequest } from './types';
import { UpdateCategorySchema } from './zod';

export async function updateCategory(
  categoryId: string,
  data: UpdateCategoryRequest,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateCategorySchema.parse(data);
  validatedData.slug = await validateSlug({
    id: categoryId,
    generateFrom: validatedData.name,
    slug: validatedData.slug,
    tableName: 'category',
  });

  if (validatedData.parentCategoryId) {
    const parentCategory = await prisma.category.findUnique({
      where: { id: validatedData.parentCategoryId },
    });

    const parentGenders = parentCategory?.gender as Gender[];
    const newCategoryGenders = validatedData.gender;

    const isSubset = newCategoryGenders.every((gender) =>
      parentGenders.includes(gender),
    );

    if (!isSubset) {
      throw new Error(
        "The genders of the new category must be a subset of the parent category's genders.",
      );
    }
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...validatedData,
    },
  });

  return updatedCategory;
}
