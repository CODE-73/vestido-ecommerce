import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateCategorySchema, CreateCategorySchemaType } from './zod';
import { Gender } from '@prisma/client';

export async function createCategory(body: CreateCategorySchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateCategorySchema.parse(body);

  if (validatedData.parentCategoryId) {
    const parentCategory = await prisma.category.findUnique({
      where: { id: validatedData.parentCategoryId },
    });

    const parentGenders = parentCategory?.gender as Gender[];
    const newCategoryGenders = validatedData.gender;

    const isSubset = newCategoryGenders.every((gender) =>
      parentGenders.includes(gender)
    );

    if (!isSubset) {
      throw new Error(
        "The genders of the new category must be a subset of the parent category's genders."
      );
    }
  }

  const newCategory = await prisma.category.create({
    data: validatedData,
  });

  return newCategory;
}
