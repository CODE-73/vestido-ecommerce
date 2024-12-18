import { FulfillmentStatus } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

//import { ListFulfillmentRequest } from './types';

export async function getFulfillmentList(
  sortBy: string,
  sortOrder: string,
  fulfillmentStatus: FulfillmentStatus[],
) {
  const prisma = getPrismaClient();

  const whereCondition =
    fulfillmentStatus && fulfillmentStatus.length > 0
      ? { status: { in: fulfillmentStatus } }
      : {};

  const fulfillmentList = await prisma.fulfillment.findMany({
    orderBy: { [sortBy]: sortOrder },
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
