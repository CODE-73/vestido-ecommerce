import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
    const order = await getOrder(params.orderId);
    if (!order) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Order does not exist',
        httpStatus: 404,
        context: {
          orderId: params.orderId,
        },
      });
    }

    return order;
  },
);
