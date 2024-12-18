import { OrderStatus } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listAdminOrders(
  sortBy: string,
  sortOrder: string, // Make sure to restrict sortOrder to 'asc' or 'desc'
  orderStatus: OrderStatus[], // Expecting an array of OrderStatus enums
) {
  const prisma = getPrismaClient();

  // Construct the where filter condition for orderStatus if the array is not null and not empty
  const whereCondition =
    orderStatus && orderStatus.length > 0
      ? { orderStatus: { in: orderStatus } }
      : {};

  const orderList = await prisma.order.findMany({
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereCondition,
  });

  return orderList;
}
