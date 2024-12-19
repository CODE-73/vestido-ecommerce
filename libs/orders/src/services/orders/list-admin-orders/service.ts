import { getPrismaClient } from '@vestido-ecommerce/models';

import { listAdminOrdersSchema, listAdminOrdersType } from './zod';

export async function listAdminOrders(data: listAdminOrdersType) {
  const prisma = getPrismaClient();

  const validatedData = listAdminOrdersSchema.parse(data);

  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ dateTime: 'asc' }];

  // Construct the where filter condition for orderStatus if the array is not null and not empty
  const whereCondition =
    validatedData.orderStatus && validatedData.orderStatus.length > 0
      ? { orderStatus: { in: validatedData.orderStatus } }
      : {};

  const orderList = await prisma.order.findMany({
    orderBy: orderByArray,
    where: whereCondition,
  });

  return orderList;
}
