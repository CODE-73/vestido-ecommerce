import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder, trackOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
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
    const rpOrderId = await trackOrder(params.orderId);

    return rpOrderId;
  },
);
