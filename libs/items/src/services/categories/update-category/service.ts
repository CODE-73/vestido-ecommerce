import { Gender } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

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
      throw new VestidoError({
        name: 'GenderNotSubsetOfParentCategoryGender',
        message:
          'The Category should only have genders included in its parent category',
        httpStatus: 404,
        context: {
          site: 'dashboard',
          parentCategoryId: validatedData.parentCategoryId,
          parentGenders,
          newCategoryGenders,
        },
      });
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
