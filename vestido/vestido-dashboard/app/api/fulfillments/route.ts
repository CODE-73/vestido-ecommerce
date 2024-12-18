import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getFulfillmentList } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    //    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const url = new URL(request.url);

    const sortBy = url.searchParams.get('sortBy') || 'dateTime';
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';
    const fulfillments = await getFulfillmentList({
      orderBy: { [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc' },
    });

    return fulfillments;
  },
);
