import { getPrismaClient } from '@vestido-ecommerce/models';

import { orderSearchCondition } from '../order-search-condition/service';
import { listAdminOrdersSchema, listAdminOrdersType } from './zod';

export async function listAdminOrders(data: listAdminOrdersType) {
  const prisma = getPrismaClient();

  const validatedData = listAdminOrdersSchema.parse(data);

  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ createdAt: 'asc' }];

  // Construct the where filter condition for orderStatus if the array is not null and not empty
  const orderStatusCondition =
    validatedData.orderStatus && validatedData.orderStatus.length > 0
      ? { orderStatus: { in: validatedData.orderStatus } }
      : {};

  const searchCondition = validatedData.q
    ? orderSearchCondition(validatedData.q)
    : {};

  const whereCondition = {
    ...orderStatusCondition,
    ...searchCondition,
  };

  const orderList = await prisma.order.findMany({
    skip: validatedData.start,
    take: validatedData.limit,
    orderBy: orderByArray,
    where: whereCondition,
  });

  return orderList;
}
