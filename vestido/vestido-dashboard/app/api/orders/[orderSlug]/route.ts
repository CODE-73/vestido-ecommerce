import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder, updateOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const order = await getOrder(params.orderSlug);
    return order;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();

    await getOrder(params.orderSlug);
    // if (!isOrderExist) {
    //   throw new VestidoError({
    //     name: 'NotFoundError',
    //     message: 'Order does not exist',
    //     httpStatus: 404,
    //     context: {
    //       orderId: params.orderId,
    //     },
    //   });
    // }
    const updatedOrder = await updateOrder(params.orderId, body);
    return updatedOrder;
  },
);
