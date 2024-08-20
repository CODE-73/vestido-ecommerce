import { getPrismaClient } from '@vestido-ecommerce/models';

import {
  UpdateFulfillmentSchema,
  UpdateFulfillmentSchemaType,
} from '../update-fulfillment/zod';

import { createShiprocketOrder } from './../../../../../third-party/shiprocket/src/services';

export async function submitFulfillment(
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
    const submittedFulfillment = await prisma.fulfillment.update({
      where: {
        id: fulfillmentId,
      },
      data: {
        status: 'STARTED',
        length: validatedData.length,
        breadth: validatedData.breadth,
        height: validatedData.height,
        weight: validatedData.weight,
      },
    });

    return submittedFulfillment;
  } else {
    throw new Error('Fulfillment has already been submitted.');
  }

  // const shiprocketData = {
  //   fulfillmentId,
  // };
  // const shiprocketOrder = await createShiprocketOrder(shiprocketData);

  // console.log('shiprocket order response: ', shiprocketOrder);
}
