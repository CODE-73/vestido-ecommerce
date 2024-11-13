import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder } from '@vestido-ecommerce/orders';
import { createRazorpayOrder } from '@vestido-ecommerce/razorpay';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request, params }) => {
    const body = await request.json();
    const isOrderExist = await getOrder(params.orderId);
    if (!isOrderExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Order does not exist',
        httpStatus: 404,
        context: {
          orderId: params.orderId,
        },
      });
    }

    try {
      const rpOrderId = await createRazorpayOrder(body);
      return rpOrderId;
    } catch (e) {
      throw new VestidoError({
        name: 'RazorpayCreateOrderFailed',
        message: 'Razorpay create order failed',
        httpStatus: 500,
        context: {
          orderId: params.orderId,
          error: e,
        },
      });
    }
  },
);
