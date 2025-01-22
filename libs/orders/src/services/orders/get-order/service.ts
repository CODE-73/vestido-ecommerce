import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function getOrder(orderId: string) {
  const prisma = getPrismaClient();

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      customer: true,
      shippingAddress: true,
      payments: true,
      fulfillments: {
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
          returns: true,
        },
      },
      orderItems: {
        include: {
          item: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  if (order) {
    const images = order.orderItems.flatMap((orderItem) => [
      ...((orderItem.item.images ?? []) as ImageSchemaType[]),
      ...(orderItem.item.variants?.flatMap(
        (v) => (v.images ?? []) as ImageSchemaType[],
      ) ?? []),
    ]);
    await populateImageURLs(images);
  }

  return order;
}
