import { getPrismaClient } from '@vestido-ecommerce/models';

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
    });

    return updatedFulfillment;
  } else {
    throw new Error('Fulfillment cannot be updated. Status is not DRAFT.');
  }
}
