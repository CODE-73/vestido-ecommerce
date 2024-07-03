import { getPrismaClient } from '@vestido-ecommerce/models';
export async function categoryDetails(categoryId: string) {
  const prisma = getPrismaClient();

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  // no try..catch here

  return category;
}
