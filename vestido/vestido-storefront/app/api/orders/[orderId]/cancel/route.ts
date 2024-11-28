import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { cancelOrder, getOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request, params }) => {
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
    const body = await request.json();
    await cancelOrder({
      ...body,
    });
    return true;
  },
);
