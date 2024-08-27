import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateFulfillmentSchema, CreateFulfillmentSchemaType } from './zod';

export async function createFulfillment(data: CreateFulfillmentSchemaType) {
  const prisma = getPrismaClient();

  // Validate the input data
  const validatedData = CreateFulfillmentSchema.parse(data);

  // Execute the operations within a transaction
  const result = await prisma.$transaction(async (prisma) => {
    // Create the fulfillment
    const newFulfillment = await prisma.fulfillment.create({
      data: {
        orderId: validatedData.orderId,
        status: 'DRAFT',
        length: validatedData.length,
        breadth: validatedData.breadth,
        height: validatedData.height,
        weight: validatedData.weight,
        fulfillmentItems: {
          createMany: {
            data: validatedData.items.map((i) => ({
              orderItemId: i.orderItemId,
              quantity: i.quantity,
            })),
          },
        },
      },
    });

    // Extract orderItemIds from the fulfillmentItems
    const orderItemIds = validatedData.items.map((item) => item.orderItemId);

    // Update the corresponding OrderItem statuses to IN_PROGRESS for the specific orderItemIds
    await prisma.orderItem.updateMany({
      where: {
        orderId: validatedData.orderId,
        id: { in: orderItemIds },
      },
      data: {
        status: 'IN_PROGRESS',
      },
    });

    // Update the Order status to IN_PROGRESS
    await prisma.order.update({
      where: {
        id: validatedData.orderId,
      },
      data: {
        orderStatus: 'IN_PROGRESS',
      },
    });

    return newFulfillment;
  });

  return result;
}
