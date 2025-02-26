import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getReturnOrder, updateReturnOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
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

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();

    await getReturnOrder(params.orderSlug);
    // if (!isReturnExist) {
    //   throw new VestidoError({
    //     name: 'NotFoundError',
    //     message: 'Return does not exist',
    //     httpStatus: 404,
    //     context: {
    //       orderId: params.returnId,
    //     },
    //   });
    // }
    const updatedReturnOrder = await updateReturnOrder(params.returnId, body);
    return updatedReturnOrder;
  },
);
