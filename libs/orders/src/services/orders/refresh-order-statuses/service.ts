import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { RefreshOrderStatusSchema, RefreshOrderStatusSchemaType } from './zod';

export async function refreshOrderStatus(data: RefreshOrderStatusSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = RefreshOrderStatusSchema.parse(data);

  if (validatedData.type === 'fulfillmentStatus') {
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
          name: 'RefreshStatusFulfillmentNotFound',
          message: `Fulfillment ${validatedData.id} not found.`,
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
            name: 'RefreshStatusOrderNotFound',
            message: `Order ${fulfillment.orderId} not found.`,
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

          const paymentDetails = await prisma.payment.findFirst({
            where: {
              orderId: fulfillment.orderId,
            },
          });

          if (!paymentDetails) {
            throw new VestidoError({
              name: 'RefreshStatusCODPaymentNotFound',
              message: `OrderPayment For Order ${fulfillment.orderId} not found.`,
            });
          }

          if (paymentDetails.paymentGateway === 'CASH_ON_DELIVERY') {
            await prisma.payment.update({
              where: {
                id: paymentDetails.id,
              },
              data: {
                status: 'CAPTURED',
              },
            });

            await prisma.order.update({
              where: {
                id: fulfillment.orderId,
              },
              data: {
                orderPaymentStatus: 'CAPTURED',
              },
            });
          }
        }
      }
      return fulfillment;
    });
  }

  if (validatedData.type === 'ReturnStatus') {
    //start a transaction
    await prisma.$transaction(async (prisma) => {
      const returnDetails = await prisma.return.findFirst({
        where: {
          id: validatedData.id,
        },
        include: {
          returnItems: true,
          order: {
            include: {
              orderItems: true,
            },
          },
        },
      });

      if (!returnDetails) {
        throw new VestidoError({
          name: 'RefreshStatusReturnNotFound',
          message: `Return ${validatedData.id} not found.`,
        });
      }

      if (
        returnDetails.status === 'IN_TRANSIT' ||
        returnDetails.status === 'PICKED_UP'
      ) {
        await Promise.all(
          returnDetails.returnItems.map(async (returnItem) => {
            const orderItemId = returnItem.orderItemId;

            if (returnDetails.type === 'RETURN') {
              await prisma.orderItem.update({
                where: { id: orderItemId },
                data: {
                  returnStatus: 'RETURN_IN_PROGRESS',
                },
              });

              await prisma.order.update({
                where: { id: returnDetails.orderId },
                data: {
                  returnStatus: 'RETURN_IN_PROGRESS',
                },
              });
            }

            if (returnDetails.type === 'REPLACE') {
              await prisma.orderItem.update({
                where: { id: orderItemId },
                data: {
                  replacementStatus: 'REPLACEMENT_IN_PROGRESS',
                },
              });

              await prisma.order.update({
                where: { id: returnDetails.orderId },
                data: {
                  replacementStatus: 'REPLACEMENT_IN_PROGRESS',
                },
              });
            }
          }),
        );
      }

      if (returnDetails.status === 'RETURNED') {
        await Promise.all(
          returnDetails.returnItems.map(async (returnItem) => {
            const orderItemId = returnItem.orderItemId;

            if (returnDetails.type === 'RETURN') {
              const updatedOrderItem = await prisma.orderItem.update({
                where: { id: orderItemId },
                data: {
                  returnedQty: returnItem.qty,
                  returnStatus: 'PARTIALLY_RETURNED',
                },
              });

              if (updatedOrderItem.qty === updatedOrderItem.returnedQty) {
                await prisma.orderItem.update({
                  where: { id: updatedOrderItem.id },
                  data: {
                    returnStatus: 'RETURNED',
                  },
                });
              }

              await prisma.order.update({
                where: { id: returnDetails.orderId },
                data: {
                  returnStatus: 'PARTIALLY_RETURNED',
                },
              });
            }

            if (returnDetails.type === 'REPLACE') {
              const updatedOrderItem = await prisma.orderItem.update({
                where: { id: orderItemId },
                data: {
                  replacedQty: returnItem.qty,
                  replacementStatus: 'PARTIALLY_RECEIVED_BACK',
                },
              });

              if (updatedOrderItem.qty === updatedOrderItem.returnedQty) {
                await prisma.orderItem.update({
                  where: { id: updatedOrderItem.id },
                  data: {
                    replacementStatus: 'RECEIVED_BACK',
                  },
                });
              }

              await prisma.order.update({
                where: { id: returnDetails.orderId },
                data: {
                  replacementStatus: 'PARTIALLY_RECEIVED_BACK',
                },
              });
            }
          }),
        );

        const order = await prisma.order.findFirst({
          where: {
            id: returnDetails.orderId,
          },
          include: {
            orderItems: true,
          },
        });

        if (!order) {
          throw new VestidoError({
            name: 'RefreshStatusOrderNotFound',
            message: `Order ${returnDetails.orderId} not found.`,
          });
        }

        //Check If all OrderItem Returned
        const allItemsReturned = order.orderItems.every(
          (item) => item.returnStatus === 'RETURNED',
        );

        if (allItemsReturned) {
          await prisma.order.update({
            where: {
              id: returnDetails.orderId,
            },
            data: {
              returnStatus: 'RETURNED',
            },
          });
        }

        //Check If all OrderItem Replaced
        const allItemsReplaced = order.orderItems.every(
          (item) => item.replacementStatus === 'RECEIVED_BACK',
        );

        if (allItemsReplaced) {
          await prisma.order.update({
            where: {
              id: returnDetails.orderId,
            },
            data: {
              replacementStatus: 'RECEIVED_BACK',
            },
          });
        }
      }
    });
  }
}
