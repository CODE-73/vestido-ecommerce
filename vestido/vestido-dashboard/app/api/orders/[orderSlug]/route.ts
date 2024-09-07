import { authMiddleware } from '@vestido-ecommerce/auth';
import { getOrder } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic';

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const order = await getOrder(params.orderSlug);
  return order;
});
