import { CreateRPOrderRequest } from './types';
import Razorpay from 'razorpay';
import { CreateRPOrderSchema } from './zod';
import { getPrismaClient } from '@vestido-ecommerce/models';

export async function createRazorpayOrder(data: CreateRPOrderRequest) {
  const razorpay = new Razorpay({
    key_id: process.env['RAZORPAY_KEY_ID'],
    key_secret: process.env['RAZORPAY_KEY_SECRET'],
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
