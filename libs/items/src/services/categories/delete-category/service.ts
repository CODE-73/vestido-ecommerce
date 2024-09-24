import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function deleteCategory(categoryId: string) {
  const prisma = getPrismaClient();

  // Validate if Items exists in the category
  const items = await prisma.item.findMany({
    where: {
      categoryId: categoryId,
    },
  });

  if (items.length > 0) {
    throw new VestidoError({
      name: 'DeletingCategoryWithItems',
      message: `There are ${items.length} items in the category. Please delete them first.`,
      httpStatus: 400,
      context: {
        categoryId,
        items: items.map((x) => x.id),
        itemsCount: items.length,
      },
    });
  }

  const deletedcategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return deletedcategory;
}
