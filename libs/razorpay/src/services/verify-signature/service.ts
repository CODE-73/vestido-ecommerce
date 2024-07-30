import * as CryptoJS from 'crypto-js';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { verifyPaymentRequest } from './types';
import { verifyRPSignSchema } from './zod';

export async function verifySignature(data: verifyPaymentRequest) {
  const prisma = getPrismaClient();
  const validatedData = verifyRPSignSchema.parse(data);

  const { order_id, payment_RP_id, razorpay_signature } = validatedData;

  const secret = 'gaWBbXq1CYrML8pItJu3rabo'; // Your Razorpay secret key

  // Generate the signature using the order_id and payment_id
  //
  const generatedSignature = CryptoJS.HmacSHA256(
    `${order_id}|${payment_RP_id}`,
    secret,
  ).toString(CryptoJS.enc.Hex);

  if (generatedSignature === razorpay_signature) {
    await prisma.payment.updateMany({
      where: {
        paymentGatewayRef: order_id,
      },
      data: {
        status: 'captured',
      },
    });

    const updatedOrderIds = await prisma.payment.findMany({
      where: {
        paymentGatewayRef: order_id,
      },
      select: {
        orderId: true,
      },
    });

    // Update order status to 'PAID' for the fetched order IDs
    await Promise.all(
      updatedOrderIds.map(async (payment) => {
        await prisma.order.update({
          where: {
            id: payment.orderId,
          },
          data: {
            status: 'PAID',
          },
        });
      }),
    );

    return true;
  } else {
    return false;
  }
}
