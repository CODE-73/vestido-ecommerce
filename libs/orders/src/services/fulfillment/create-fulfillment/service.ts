import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateFulfillmentSchema, CreateFulfillmentSchemaType } from './zod';

export async function createFulfillment(data: CreateFulfillmentSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateFulfillmentSchema.parse(data);
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
          data: validatedData.fulfillmentItems.map((i) => ({
            orderItemId: i.orderItemId,
            quantity: i.quantity,
          })),
        },
      },
    },
  });

  return newFulfillment;
}
