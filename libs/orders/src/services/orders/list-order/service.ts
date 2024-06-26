import { PrismaClient } from '@prisma/client';

export async function listOrder(customerId: string) {
  const prisma = new PrismaClient();

  // validate zod here
  const orderList = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
  });
  // pass to prisma next

  return orderList;
}
