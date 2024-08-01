import { getPrismaClient } from '@vestido-ecommerce/models';

export async function verifyOrderExist(orderId: string) {
  const prisma = getPrismaClient();

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  if (order) {
    return true;
  } else return false;
}
