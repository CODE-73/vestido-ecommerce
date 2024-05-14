import { PrismaClient } from '@prisma/client';

export async function listCategories() {
  const prisma = new PrismaClient();

  const categoriesList = await prisma.category.findMany();

  return categoriesList;
}
