import Razorpay from 'razorpay';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateRPOrderRequest } from './types';
import { CreateRPOrderSchema } from './zod';

export async function createRazorpayOrder(data: CreateRPOrderRequest) {
  const razorpay = new Razorpay({
    key_id: process.env['RAZORPAY_KEY_ID'] as string,
    key_secret: process.env['RAZORPAY_KEY_SECRET'] as string,
  });

  console.log('data in services:', data);
  const prisma = getPrismaClient();
  const validatedData = CreateRPOrderSchema.parse(data.razorpayData);

  const { amount, currency } = validatedData;

  const options = {
    amount,
    currency,
  };
  console.log('options and validatedData', validatedData, options);
  const resp = await razorpay.orders.create(options);
  console.log('resp from services:', resp);
  if (resp.status == 'created') {
    await prisma.payment.create({
      data: {
        order: {
          connect: {
            id: validatedData.orderId,
          },
        },
        paymentGateway: 'Razorpay',
        paymentGatewayRef: resp.id,
        moreDetails: 'Null',
        currency: resp.currency,
        amount: validatedData.amount,
        status: resp.status,
      },
    });
    return resp.id;
  } else return null;
}
