import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { apiRouteHandler } from '@vestido-ecommerce/utils';
import { getOrderCount } from '@vestido-ecommerce/widgets';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const body = await request.json();
    const orderCount = await getOrderCount(body);

    return orderCount;
  },
);
