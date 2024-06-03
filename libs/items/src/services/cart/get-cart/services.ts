import { PrismaClient } from '@prisma/client';

export async function listCartItems(customerId: string) {
  const prisma = new PrismaClient();

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
          unit: true,
          stock: true,
        },
      },
    },
  });

  return CartItems;
}
