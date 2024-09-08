import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { verifyPaymentExist } from '@vestido-ecommerce/orders';
import { cancelPayment, processPayment } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request, params }) => {
    const body = await request.json();
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

    const isSignverified = await processPayment(body);
    if (!isSignverified) {
      throw new VestidoError({
        name: 'SignatureVerificationError',
        message: 'RazorPay Signature verification failed',
        httpStatus: 400,
        context: {
          paymentId: params.paymentId,
        },
      });
    }
    return true;
  },
);

export const PUT = apiRouteHandler(
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
