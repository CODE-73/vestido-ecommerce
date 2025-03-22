import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder, returnOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ request, params }) => {
    const isOrderExist = await getOrder(params.orderId);
    if (!isOrderExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Order Not Found Error',
        httpStatus: 404,
        context: {
          orderId: params.orderId,
        },
      });
    }
    const body = await request.json();
    const returnOrderDetails = await returnOrder({ ...body });
    return returnOrderDetails;
  },
);
