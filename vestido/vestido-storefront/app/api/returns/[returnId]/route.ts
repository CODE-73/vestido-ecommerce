import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getReturnOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
    const order = await getReturnOrder(params.returnId);
    if (!order) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Return Order does not exist',
        httpStatus: 404,
        context: {
          orderId: params.returnId,
        },
      });
    }

    return order;
  },
);
