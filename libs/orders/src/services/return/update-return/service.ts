import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { getReturnOrder } from '../get-return-order';
import { UpdateReturnSchema } from './zod';

export async function updateReturnOrder(returnId: string, data: string) {
  const validatedData = UpdateReturnSchema.parse(data);

  const prisma = getPrismaClient();

  // Start a transaction
  const result = await prisma.$transaction(async (prisma) => {
    const returnOrder = await getReturnOrder(returnId);
    if (!returnOrder) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'ReturnOrder Not Found Error',
        httpStatus: 404,
        context: {
          orderId: returnId,
        },
      });
    }
    let returnPayment;
    if (validatedData.status === 'REFUNDED') {
      returnPayment = await prisma.payment.updateMany({
        where: {
          orderId: returnId,
        },
        data: {
          status: 'REFUNDED',
        },
      });
    }

    return returnPayment;
  });

  return result;
}
