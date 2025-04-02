import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType, VestidoError } from '@vestido-ecommerce/utils';

export async function getFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  const fulfillment = await prisma.fulfillment.findUnique({
    where: {
      id: fulfillmentId,
    },
    include: {
      order: true,
      fulfillmentItems: {
        include: {
          orderItem: {
            include: {
              item: {
                include: {
                  variants: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (fulfillment) {
    const images = fulfillment.fulfillmentItems.flatMap((fulfillmentItem) => [
      ...((fulfillmentItem.orderItem.item.images ?? []) as ImageSchemaType[]),
      ...(fulfillmentItem.orderItem.item.variants?.flatMap(
        (v) => (v.images ?? []) as ImageSchemaType[],
      ) ?? []),
    ]);
    await populateImageURLs(images);
  }

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
