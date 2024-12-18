import { getPrismaClient } from '@vestido-ecommerce/models';

//import { ListFulfillmentRequest } from './types';

export async function getFulfillmentList(options?: {
  orderBy?: Record<string, 'asc' | 'desc'>;
}) {
  const prisma = getPrismaClient();

  const fulfillmentList = await prisma.fulfillment.findMany({
    orderBy: options?.orderBy,
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
