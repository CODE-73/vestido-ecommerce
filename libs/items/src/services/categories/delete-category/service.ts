import { getPrismaClient } from '@vestido-ecommerce/models';
export async function deleteCategory(categoryId: string) {
  const prisma = getPrismaClient();

  const deletedcategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedcategory;
}
