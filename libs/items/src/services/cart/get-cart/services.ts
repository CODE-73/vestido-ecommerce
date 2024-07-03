import { getPrismaClient } from '@vestido-ecommerce/models';
export async function listCartItems(customerId: string) {
  const prisma = getPrismaClient();

  const CartItems = await prisma.cartItem.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      item: {
        select: {
          title: true,
          description: true,
          price: true,
          stockStatus: true,
          images: true,
        },
      },
    },
  });

  return CartItems;
}
