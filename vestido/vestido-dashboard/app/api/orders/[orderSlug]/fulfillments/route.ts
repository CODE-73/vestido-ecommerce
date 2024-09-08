import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { createFulfillment, getOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();
    const isOrderExist = await getOrder(params.orderSlug);
    if (!isOrderExist) {
      return new Response(JSON.stringify({ error: 'Order does not exist' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const fulfillment = await createFulfillment(body);
    return fulfillment;
  },
);
