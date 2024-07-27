import { Gender } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { validateSlug } from '../../slug';
import { CreateCategorySchema, CreateCategorySchemaType } from './zod';

export async function createCategory(body: CreateCategorySchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateCategorySchema.parse(body);
  validatedData.slug = await validateSlug({
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

  const newCategory = await prisma.category.create({
    data: {
      ...validatedData,
      slug: validatedData.slug ?? '',
    },
  });

  return newCategory;
}
