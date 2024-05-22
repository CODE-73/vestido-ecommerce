import { PrismaClient } from '@prisma/client';

export async function categoryDetails(categoryId: string) {
  const prisma = new PrismaClient();

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  // no try..catch here

  return category;
}
