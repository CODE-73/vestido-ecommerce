import { PrismaClient } from '@prisma/client';

export async function listCategories() {
  const prisma = new PrismaClient();

  const categories = prisma.category.findMany();

  return categories;
}
