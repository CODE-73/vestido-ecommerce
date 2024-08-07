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
  const validatedData = CreateRPOrderSchema.parse(data.razorpayData);

  const { amount, currency } = validatedData;

  const options = {
    amount,
    currency,
  };
  const resp = await razorpay.orders.create(options);
  if (resp.status == 'created') {
    const newPayment = await prisma.payment.create({
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
    const response = {
      razorpayOrderId: resp.id,
      paymentId: newPayment.id,
    };
    return response;
  } else return null;
}
