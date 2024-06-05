import { PrismaClient } from '@prisma/client';

export async function deleteCategory(categoryId: string) {
  const prisma = new PrismaClient();

  const deletedcategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedcategory;
}
