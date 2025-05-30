import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    // Extract search parameters and validate using Zod
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries(),
    );

    const orders = await listAdminOrders(params);

    return orders;
  },
);
