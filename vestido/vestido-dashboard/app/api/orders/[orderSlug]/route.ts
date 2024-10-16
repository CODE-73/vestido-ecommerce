import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const order = await getOrder(params.orderSlug);
    return order;
  },
);
