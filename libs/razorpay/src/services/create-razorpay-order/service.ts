import Razorpay from 'razorpay';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateRPOrderRequest } from './types';
import { CreateRPOrderSchema } from './zod';

export async function createRazorpayOrder(data: CreateRPOrderRequest) {
  const razorpay = new Razorpay({
    key_id: process.env['RAZORPAY_KEY_ID'] as string,
    key_secret: process.env['RAZORPAY_KEY_SECRET'] as string,
  });

  const prisma = getPrismaClient();

  const validatedData = CreateRPOrderSchema.parse(data);

  const { amount, currency } = validatedData;

  const options = {
    amount,
    currency,
  };

  const resp = await razorpay.orders.create(options);

  await prisma.payment.update({
    where: {
      orderId: validatedData.orderId,
    },
    data: {
      paymentGatewayRef: resp.id,
    },
  });

  return resp.id;
}
