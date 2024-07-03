import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listOrder(customerId: string) {
  const prisma = getPrismaClient();

  // validate zod here
  const orderList = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
  });
  // pass to prisma next

  return orderList;
}
