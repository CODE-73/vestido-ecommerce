import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { CancelOrderSchema, CancelOrderSchemaType } from './zod';

export async function cancelOrder(
  data: CancelOrderSchemaType | unknown,
): Promise<boolean> {
  const prisma = getPrismaClient();
  const { orderId, reason, remarks } = CancelOrderSchema.parse(data);
  try {
    // Check if the order has any submitted fulfillments
    const hasSubmittedFulfillments = await prisma.fulfillment.findFirst({
      where: {
        orderId,
        status: {
          not: 'DRAFT',
        },
      },
    });

    if (hasSubmittedFulfillments) {
      console.error(
        'Order cannot be cancelled because it has submitted fulfillments.',
      );
      return false; // Cancel the operation if submitted fulfillments exist
    }

    // Add cancellation details to the logs array
    await prisma.$transaction([
      // Update the logs column in the Order table
      prisma.order.update({
        where: { id: orderId },
        data: {
          orderStatus: 'CANCELLED',
        },
      }),

      // Log the cancellation in the OrderLog table
      prisma.orderLog.create({
        data: {
          orderId,
          logType: 'USER_ORDER_CANCELLATION', // Log type for cancellation
          rawData: {
            reason,
            remarks,
          },
        },
      }),
    ]);

    return true;
  } catch (error) {
    throw new VestidoError({
      name: 'OrderCancellationFailed',
      message: `Error Cancelling Order with ID ${orderId}`,
      httpStatus: 500,
      context: {
        error: error,
      },
    });

    return false;
  }
}
