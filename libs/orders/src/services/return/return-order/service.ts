import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { getOrder } from '../../orders/get-order';
import { returnOrderSchema, returnOrderSchemaType } from './zod';

export async function returnOrder(data: returnOrderSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = await returnOrderSchema.parse(data);

  const orderDetails = await getOrder(validatedData.orderId);
  if (!orderDetails) {
    throw new VestidoError({
      name: 'NotFoundError',
      message: 'Order Not Found Error',
      httpStatus: 404,
      context: {
        orderId: validatedData.orderId,
      },
    });
  }

  const fulfillmentDetails = await prisma.fulfillment.findFirst({
    where: {
      id: validatedData.fulfillmentId,
    },
    include: {
      fulfillmentItems: {
        select: {
          fulfillmentItemPrice: true,
        },
      },
    },
  });
  if (!fulfillmentDetails) {
    throw new VestidoError({
      name: 'NotFoundError',
      message: 'Fulfillment Not Found Error',
      httpStatus: 404,
      context: {
        orderId: validatedData.fulfillmentId,
      },
    });
  }
  if (fulfillmentDetails.status !== 'DELIVERED') {
    throw new VestidoError({
      name: 'FulfillmentNotInDeliveredState',
      message: `Fulfillment is not in DELIVERED Status. ${fulfillmentDetails.id} is in ${fulfillmentDetails?.status} status`,
      httpStatus: 401,
    });
  }

  const today = new Date();
  const deliveredDate = new Date(fulfillmentDetails.deliveredDate!);
  const daysDifference = Math.floor(
    (today.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysDifference > 3) {
    throw new VestidoError({
      name: 'ReturnWindowExpired',
      message: `The return window has expired. ${fulfillmentDetails.id} was delivered on ${fulfillmentDetails.deliveredDate}.`,
      httpStatus: 401,
    });
  }

  const returnOrder = await prisma.return.create({
    data: {
      fulfillmentId: validatedData.fulfillmentId,
      orderId: validatedData.orderId,
      reason: validatedData.reason,
      status: 'AWAITING_PICKUP',
    },
  });
  return returnOrder;
}
