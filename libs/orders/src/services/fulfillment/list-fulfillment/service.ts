import { getPrismaClient } from '@vestido-ecommerce/models';

import { fulfillmentSearchCondition } from '../fulfillment-search-condition/service';
import { ListFulfillmentSchema, ListFulfillmentSchemaType } from './zod';

export async function getFulfillmentList(data: ListFulfillmentSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = ListFulfillmentSchema.parse(data);

  const orderByArray = validatedData.orderBy?.map(({ column, direction }) => ({
    [column]: direction,
  })) || [{ dateTime: 'asc' }];

  const fulfillmentStatusCondition =
    validatedData.fulfillmentStatus &&
    validatedData.fulfillmentStatus.length > 0
      ? { status: { in: validatedData.fulfillmentStatus } }
      : {};

  const searchCondition = validatedData.q
    ? fulfillmentSearchCondition(validatedData.q)
    : {};

  const whereCondition = {
    ...fulfillmentStatusCondition,
    ...searchCondition,
  };

  const fulfillmentList = await prisma.fulfillment.findMany({
    orderBy: orderByArray,
    where: whereCondition,
    include: {
      fulfillmentItems: {
        include: {
          orderItem: {
            include: {
              item: true,
            },
          },
        },
      },
    },
  });

  return fulfillmentList;
}
