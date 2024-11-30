import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { getOrder } from '../../orders/get-order';
import { CreateFulfillmentSchema, CreateFulfillmentSchemaType } from './zod';

export async function createFulfillment(data: CreateFulfillmentSchemaType) {
  const prisma = getPrismaClient();

  // Validate the input data
  const validatedData = CreateFulfillmentSchema.parse(data);

  const order = await getOrder(validatedData.orderId);
  if (
    order?.orderStatus !== 'CONFIRMED' &&
    order?.orderStatus !== 'IN_PROGRESS'
  ) {
    throw new VestidoError({
      name: 'OrderNotInConfirmedState',
      message: `Order is not in CONFIRMED/IN_PROGRESS Status. ${validatedData.orderId} is in ${order?.orderStatus} status`,
      httpStatus: 401,
    });
  }

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
        pickup_location: validatedData.pickup_location,
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
