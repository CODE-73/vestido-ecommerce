import { populateImageURLs } from '@vestido-ecommerce/caching';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export async function listOrder(customerId: string) {
  const prisma = getPrismaClient();

  // validate zod here
  const orderList = await prisma.order.findMany({
    where: {
      customerId: customerId,
    },
    include: {
      orderItems: {
        include: {
          item: {
            include: {
              variants: {
                include: {
                  attributeValues: {
                    include: {
                      attribute: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const images = orderList.flatMap((order) =>
    order.orderItems.flatMap((orderItem) => [
      ...((orderItem.item.images ?? []) as ImageSchemaType[]),
      ...(orderItem.item.variants?.flatMap(
        (v) => (v.images ?? []) as ImageSchemaType[],
      ) ?? []),
    ]),
  );

  await populateImageURLs(images);

  return orderList;
}
