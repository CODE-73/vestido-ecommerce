import { PrismaClient } from '@prisma/client';
import { CreateCategorySchema, CreateCategorySchemaType } from './zod';

export async function createCategory(body: CreateCategorySchemaType) {
  const prisma = new PrismaClient();

  const validatedData = CreateCategorySchema.parse(body);

  const newCategory = await prisma.category.create({
    data: validatedData,
  });

  return newCategory;
}
