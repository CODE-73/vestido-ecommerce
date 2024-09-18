import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function getFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  const fulfillment = await prisma.fulfillment.findUnique({
    where: {
      id: fulfillmentId,
    },
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

  if (!fulfillment) {
    throw new VestidoError({
      name: 'FulfillmentNotFound',
      message: `Fulfillment ${fulfillmentId} not found`,
      httpStatus: 404,
      context: {
        fulfillmentId,
      },
    });
  }
  return fulfillment;
}
