import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getOrder(orderId: string) {
  const prisma = getPrismaClient();

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
    },
  });
  // no try..catch here
  return order;
}
