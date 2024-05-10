import { UpdateCategoryRequest } from './types';
import { PrismaClient } from '@prisma/client';
import { UpdateCategorySchema } from './zod';

export async function updateCategory(
  categoryId: string,
  data: UpdateCategoryRequest
) {
  const prisma = new PrismaClient();

  const validatedData = UpdateCategorySchema.parse(data);

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
