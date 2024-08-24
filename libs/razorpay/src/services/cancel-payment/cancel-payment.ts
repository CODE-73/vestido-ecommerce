import { getPrismaClient } from '@vestido-ecommerce/models';

export async function cancelPayment(paymentId: string) {
  const prisma = getPrismaClient();

  await prisma.$transaction(async (transaction) => {
    // Update payment status to FAILED
    const payment = await transaction.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: 'FAILED',
      },
      include: {
        order: true,
      },
    });

    // Update the corresponding order's orderPaymentStatus to FAILED
    await transaction.order.update({
      where: {
        id: payment.orderId,
      },
      data: {
        orderStatus: 'CANCELLED',
        orderPaymentStatus: 'FAILED',
      },
    });
    return payment;
  });
}
