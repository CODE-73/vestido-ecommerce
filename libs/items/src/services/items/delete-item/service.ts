import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteItem(itemId: string) {
  const prisma = getPrismaClient();

  const item = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });
  // no try..catch here

  return item;
}
