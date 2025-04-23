import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listReturnOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries(),
    );
    const returnOrders = await listReturnOrders(params);

    return returnOrders;
  },
);
