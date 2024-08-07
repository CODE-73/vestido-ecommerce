import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateCODRequest } from './types';
import { CreateCODSchema } from './zod';

export async function createCOD(data: CreateCODRequest) {
  const prisma = getPrismaClient();
  const validatedData = CreateCODSchema.parse(data);

  const newPayment = await prisma.payment.create({
    data: {
      order: {
        connect: {
          id: validatedData.orderId,
        },
      },
      paymentGateway: 'Cash on Delivery',
      paymentGatewayRef: 'Null',
      moreDetails: 'Null',
      currency: validatedData.currency,
      amount: validatedData.amount,
      status: 'not created',
    },
  });

  return newPayment.id;
}
