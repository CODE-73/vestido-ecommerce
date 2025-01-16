import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listReturnOrders() {
  const prisma = getPrismaClient();

  const returnOrderList = await prisma.return.findMany({});
  return returnOrderList;
}
