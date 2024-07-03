import { UpdateCategoryRequest } from './types';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { UpdateCategorySchema } from './zod';

export async function updateCategory(
  categoryId: string,
  data: UpdateCategoryRequest
) {
  const prisma = getPrismaClient();

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
