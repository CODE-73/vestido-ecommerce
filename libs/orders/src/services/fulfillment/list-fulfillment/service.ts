import { getPrismaClient } from '@vestido-ecommerce/models';
// import { VestidoError } from '@vestido-ecommerce/utils';

export async function getFulfillmentList(args: ListFulfillmentRequest) {
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

  // if (!fulfillment) {
  //   throw new VestidoError({
  //     name: 'FulfillmentNotFound',
  //     message: `Fulfillment ${fulfillmentId} not found`,
  //     httpStatus: 404,
  //     context: {
  //       fulfillmentId,
  //     },
  //   });
  // }
  return fulfillmentList;
}
