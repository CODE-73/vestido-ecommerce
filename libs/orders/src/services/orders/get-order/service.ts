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
  if (order?.fulfillments.length === 0) {
    order.fulfillments.push({
      id: '123123',
      dateTime: new Date(),
      orderId: order.id,
      status: 'DRAFT',
      breadth: 10,
      weight: 10,
      height: 10,
      length: 10,
      tracking: null,
      shipment_id: null,
      shiprocket_order_id: null,
      fulfillmentItems: [
        // @ts-expect-error TODO: fix type mismatch
        order.orderItems.map((x) => ({
          id: '123',
          fulfillmentId: '123',
          orderItemId: x.id,
          quantity: x.qty,
          orderItem: {
            ...x,
          },
        })),
      ],
    });
  }
  return order;
}
