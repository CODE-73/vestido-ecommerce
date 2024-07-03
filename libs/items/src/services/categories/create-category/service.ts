import { getPrismaClient } from '@vestido-ecommerce/models';
import { CreateCategorySchema, CreateCategorySchemaType } from './zod';

export async function createCategory(body: CreateCategorySchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateCategorySchema.parse(body);

  const newCategory = await prisma.category.create({
    data: validatedData,
  });

  return newCategory;
}
