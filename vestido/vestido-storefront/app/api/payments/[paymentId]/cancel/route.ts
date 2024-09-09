import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { verifyPaymentExist } from '@vestido-ecommerce/orders';
import { cancelPayment } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
    const isPaymentExist = await verifyPaymentExist(params.paymentId);

    if (!isPaymentExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Payment does not exist',
        httpStatus: 404,
        context: {
          paymentId: params.paymentId,
        },
      });
    }

    const payment = await cancelPayment(params.paymentId);
    return payment;
  },
);
