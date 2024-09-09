import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { UpdateFulfillmentSchema, UpdateFulfillmentSchemaType } from './zod';

export async function updateFulfillment(
  fulfillmentId: string,
  data: UpdateFulfillmentSchemaType,
) {
  const prisma = getPrismaClient();
  const validatedData = UpdateFulfillmentSchema.parse(data);

  const existingFulfillment = await prisma.fulfillment.findUnique({
    where: {
      id: fulfillmentId,
    },
    select: {
      status: true,
    },
  });

  if (existingFulfillment?.status === 'DRAFT') {
    const incomingItems = validatedData.items;

    // Extract fulfillmentItemIds from the request
    const incomingFulfillmentItemIds = incomingItems
      .filter((item) => item.id)
      .map((item) => item.id);

    // Find existing FulfillmentItems for the given fulfillmentId
    const existingFulfillmentItems = await prisma.fulfillmentItem.findMany({
      where: {
        fulfillmentId: fulfillmentId,
      },
    });

    // Extract existing fulfillmentItemIds from the database
    const existingFulfillmentItemIds = existingFulfillmentItems.map(
      (item) => item.id,
    );

    // Determine which items to delete (those present in the DB but not in the request)
    const idsToDelete = existingFulfillmentItemIds.filter(
      (id) => !incomingFulfillmentItemIds.includes(id),
    );

    // Delete those FulfillmentItems
    await prisma.fulfillmentItem.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });

    // Upsert FulfillmentItems based on incoming request
    for (const item of validatedData.items) {
      if (item.id) {
        // Update existing fulfillment item by fulfillmentItemId
        await prisma.fulfillmentItem.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity,
          },
        });
      } else if (item.orderItemId) {
        // Create new fulfillment item by orderItemId
        await prisma.fulfillmentItem.create({
          data: {
            fulfillmentId: fulfillmentId,
            orderItemId: item.orderItemId,
            quantity: item.quantity,
          },
        });
      }
    }

    // Update the Fulfillment with the other details
    const updatedFulfillment = await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        length: validatedData.length,
        breadth: validatedData.breadth,
        height: validatedData.height,
        weight: validatedData.weight,
      },
      include: {
        fulfillmentItems: true, // Include the related fulfillment items
      },
    });

    return updatedFulfillment;
  } else {
    throw new VestidoError({
      name: 'LogicalErrorFulfillmentUpdateFailed',
      message: `Fulfillment ${fulfillmentId} cannot be updated. Status is not DRAFT.`,
    });
  }
}
