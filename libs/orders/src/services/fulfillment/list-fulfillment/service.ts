import { getPrismaClient } from '@vestido-ecommerce/models';
import { ListFulfillmentRequest } from './types';

export async function getFulfillmentList(_args: ListFulfillmentRequest) {
  const prisma = getPrismaClient();

  const fulfillmentList = await prisma.fulfillment.findMany({
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
