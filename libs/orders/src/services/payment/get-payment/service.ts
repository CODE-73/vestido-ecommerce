import { getPrismaClient } from '@vestido-ecommerce/models';

export async function verifyPaymentExist(paymentId: string) {
  const prisma = getPrismaClient();

  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });
  if (payment) {
    return true;
  } else return false;
}
