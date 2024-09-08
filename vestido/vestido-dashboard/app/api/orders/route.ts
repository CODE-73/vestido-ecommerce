import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async () => {
    const orders = await listAdminOrders();
    return orders;
  },
);
