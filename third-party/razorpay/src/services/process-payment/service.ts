import { clearCartOnOrderCreation } from '@vestido-ecommerce/items';
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
    const razorpayRef = JSON.stringify({
      rpOrderId: order_id,
      rpPaymentId: payment_RP_id,
    });
    await prisma.payment.updateMany({
      where: {
        id: validatedData.paymentId,
      },
      data: {
        status: 'CAPTURED',
        paymentGatewayRef: razorpayRef,
      },
    });

    const updatedOrderIds = await prisma.payment.findMany({
      where: {
        id: validatedData.paymentId,
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
            orderStatus: 'CONFIRMED',
            orderPaymentStatus: 'CAPTURED',
          },
          select: {
            customerId: true,
            orderItems: true,
          },
        });

        await prisma.orderItem.updateMany({
          where: {
            orderId: payment.orderId,
          },
          data: {
            status: 'CONFIRMED',
          },
        });

        await clearCartOnOrderCreation(payment.orderId);
      }),
    );

    return true;
  } else {
    return false;
  }
}
