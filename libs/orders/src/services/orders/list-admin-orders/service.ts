import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listAdminOrders() {
  const prisma = getPrismaClient();
  const orderList = await prisma.order.findMany();

  return orderList;
}
