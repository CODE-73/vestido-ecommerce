import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePaymentSignature } from '../signature';
import { verifyPaymentRequest } from './types';
import { verifyRPSignSchema } from './zod';

export async function processPayment(data: verifyPaymentRequest) {
  const prisma = getPrismaClient();
  const validatedData = verifyRPSignSchema.parse(data);

  const { order_id, payment_RP_id, razorpay_signature } = validatedData;

  const generatedSignature = generatePaymentSignature(order_id, payment_RP_id);

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
