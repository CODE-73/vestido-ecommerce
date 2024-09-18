import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getFulfillmentList } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const fulfillments = await getFulfillmentList(args);

    return fulfillments;
  },
);
