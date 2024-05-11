import { CreateCategoryRequest } from './types';
import { PrismaClient } from '@prisma/client';
import { CreateCategorySchema } from './zod';

export async function createCategory(body: CreateCategoryRequest) {
  const prisma = new PrismaClient();

  const validatedData = CreateCategorySchema.parse(body);

  const newCategory = prisma.category.create({
    data: validatedData,
  });

  return newCategory;
}
