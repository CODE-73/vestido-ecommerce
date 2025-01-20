import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listReturnOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async () => {
    const returnOrders = await listReturnOrders();

    return returnOrders;
  },
);
