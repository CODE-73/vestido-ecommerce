import { getPrismaClient } from '@vestido-ecommerce/models';
import { cancelShiprocketOrder } from '@vestido-ecommerce/shiprocket';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function cancelFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  const result = await prisma.$transaction(async (prisma) => {
    const fulfillmentToCancel = await prisma.fulfillment.findUnique({
      where: {
        id: fulfillmentId,
      },
      select: {
        status: true,
        orderId: true,
        shiprocket_order_id: true,
        fulfillmentItems: {
          select: {
            orderItemId: true,
            quantity: true,
          },
        },
      },
    });

    if (!fulfillmentToCancel) {
      throw new VestidoError({
        name: 'FulfillmentNotFound',
        message: `Item ${fulfillmentId} not found`,
      });
    }

    if (fulfillmentToCancel.status !== 'AWAITING_PICKUP') {
      throw new VestidoError({
        name: 'LogicalErrorFulfillmentAlreadyPickedup',
        message: 'Fulfillment cannot be cancelled as it is already Pickedup.',
      });
    }

    // Adjust the quantities and statuses of the associated OrderItems
    const updates = fulfillmentToCancel.fulfillmentItems.map(async (item) => {
      const orderItem = await prisma.orderItem.findUnique({
        where: {
          id: item.orderItemId,
        },
        select: {
          qty: true,
          fulfilledQuantity: true,
          status: true,
        },
      });

      if (!orderItem) {
        throw new VestidoError({
          name: 'SystemErrorOrderNotFound',
          message: `OrderItem ${orderItem} not found`,
        });
      }

      const newFulfilledQuantity =
        (orderItem.fulfilledQuantity || 0) - item.quantity;

      if (newFulfilledQuantity < 0) {
        throw new VestidoError({
          name: 'LogicalErrorFulfillmentQuantity',
          message: 'Fulfilled quantity cannot be negative.',
        });
      }

      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: item.orderItemId,
        },
        data: {
          fulfilledQuantity: newFulfilledQuantity,
          status:
            orderItem.qty > newFulfilledQuantity ? 'CONFIRMED' : 'IN_PROGRESS',
        },
      });

      return updatedOrderItem;
    });

    await Promise.all(updates);

    // Update the Fulfillment status to 'CANCELLED'
    const cancelledFulfillment = await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        status: 'CANCELLED',
      },
      include: {
        fulfillmentItems: true,
      },
    });

    // Recheck if all OrderItems' statuses are still IN_PROGRESS
    const order = await prisma.order.findUnique({
      where: {
        id: fulfillmentToCancel.orderId,
      },
      select: {
        orderItems: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!order) {
      throw new VestidoError({
        name: 'SystemErrorOrderNotFound',
        message: `Order ${order} not found`,
      });
    }

    const allItemsInProgress = order.orderItems.every(
      (item) => item.status === 'IN_PROGRESS',
    );

    if (!allItemsInProgress) {
      await prisma.order.update({
        where: {
          id: fulfillmentToCancel.orderId,
        },
        data: {
          orderStatus: 'CONFIRMED',
        },
      });
    }

    if (!cancelledFulfillment.shiprocket_order_id) {
      throw new VestidoError({
        name: 'SystemErrorFulfillmentCancel',
        message:
          'Fulfillment cannot be cancelled as Shiprocket Order not found on Fulfillment.',
      });
    }

    const cancelResponse = await cancelShiprocketOrder(
      cancelledFulfillment.shiprocket_order_id,
    );

    if (cancelResponse.status_code !== 1) {
      throw new Error('Error in cancelling Shiprocket Order');
    }

    return cancelledFulfillment;
  });

  return result;
}
