import { getPrismaClient } from '@vestido-ecommerce/models';
import {
  UpdateFulfillmentSchema,
  UpdateFulfillmentSchemaType,
} from '../update-fulfillment/zod';
import { createShiprocketOrder } from './../../../../../third-party/shiprocket/src/services';

export async function submitFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    const existingFulfillment = await prisma.fulfillment.findUnique({
      where: {
        id: fulfillmentId,
      },
      select: {
        status: true,
        orderId: true, // Get the orderId associated with the fulfillment
        fulfillmentItems: {
          select: {
            orderItemId: true,
            quantity: true,
          },
        },
      },
    });

    if (!existingFulfillment) {
      throw new Error('Fulfillment not found.');
    }

    if (existingFulfillment.status !== 'DRAFT') {
      throw new Error('Fulfillment has already been submitted.');
    }

    // Prepare the updates for OrderItems
    const updates = existingFulfillment.fulfillmentItems.map(async (item) => {
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
        throw new Error('OrderItem not found.');
      }

      const newFulfilledQuantity =
        (orderItem.fulfilledQuantity || 0) + item.quantity;

      if (newFulfilledQuantity > orderItem.qty) {
        // Quantity exceeds the OrderItem's quantity, do not update
        throw new Error('Fulfilled quantity exceeds OrderItem quantity.');
      }

      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: item.orderItemId,
        },
        data: {
          fulfilledQuantity: newFulfilledQuantity,
          status:
            newFulfilledQuantity === orderItem.qty
              ? 'IN_PROGRESS'
              : orderItem.status,
        },
      });

      return updatedOrderItem;
    });

    // Execute the updates
    await Promise.all(updates);

    // Update the Fulfillment status
    const updatedFulfillment = await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        status: 'AWAITING_PICKUP',
      },
    });

    // Check if all OrderItems' statuses are IN_PROGRESS and update Order status
    const order = await prisma.order.findUnique({
      where: {
        id: existingFulfillment.orderId,
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
      throw new Error('Order not found.');
    }

    const allItemsInProgress = order.orderItems.every(
      (item) => item.status === 'IN_PROGRESS',
    );

    if (allItemsInProgress) {
      await prisma.order.update({
        where: {
          id: existingFulfillment.orderId,
        },
        data: {
          orderStatus: 'IN_PROGRESS',
        },
      });
    }

    return updatedFulfillment;
  });

  // const shiprocketData = {
  //   fulfillmentId,
  // };
  // const shiprocketOrder = await createShiprocketOrder(shiprocketData);

  // console.log('shiprocket order response: ', shiprocketOrder);

  return result;
}
