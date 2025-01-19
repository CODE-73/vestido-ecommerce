import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { RefreshOrderStatusSchema, RefreshOrderStatusSchemaType } from './zod';

export async function refreshOrderStatus(data: RefreshOrderStatusSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = RefreshOrderStatusSchema.parse(data);

  //start a transaction
  await prisma.$transaction(async (prisma) => {
    const fulfillment = await prisma.fulfillment.findFirst({
      where: {
        id: validatedData.id,
      },
      include: {
        fulfillmentItems: {
          include: {
            orderItem: true,
          },
        },
        order: true,
      },
    });
    if (!fulfillment) {
      throw new VestidoError({
        name: 'SystemErrorFulfillmentNotFound',
        message: `Fulfillment ${fulfillment} not found.`,
      });
    }

    if (fulfillment.status === 'DELIVERED') {
      await Promise.all(
        fulfillment.fulfillmentItems.map(async (fulfillmentItem) => {
          const orderItemId = fulfillmentItem.orderItemId;

          // Check if all fulfillments for the current OrderItem are DELIVERED
          const allDelivered = await prisma.fulfillmentItem.count({
            where: {
              orderItemId,
              fulfillment: {
                status: { not: 'DELIVERED' }, // Find if any are not delivered
              },
            },
          });

          // Update OrderItem only if all fulfillments are delivered
          if (allDelivered === 0) {
            await prisma.orderItem.update({
              where: { id: orderItemId },
              data: {
                status: 'COMPLETED',
                deliveryStatus: 'COMPLETED',
              },
            });
          }
        }),
      );

      const order = await prisma.order.findFirst({
        where: {
          id: fulfillment.orderId,
        },
        include: {
          orderItems: true,
        },
      });

      if (!order) {
        throw new VestidoError({
          name: 'SystemErrorOrderNotFound',
          message: `Order ${order} not found.`,
        });
      }
      const allItemsComplete = order.orderItems.every(
        (item) => item.status === 'COMPLETED',
      );

      if (allItemsComplete) {
        await prisma.order.update({
          where: {
            id: fulfillment.orderId,
          },
          data: {
            orderStatus: 'COMPLETED',
            deliveryStatus: 'COMPLETED',
          },
        });
      }
    }
    return fulfillment;
  });
}
