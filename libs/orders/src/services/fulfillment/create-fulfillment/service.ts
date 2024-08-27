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
      include: {
        fulfillmentItems: true, // Include the related fulfillment items
      },
    });

    return newFulfillment;
  });

  return result;
}
