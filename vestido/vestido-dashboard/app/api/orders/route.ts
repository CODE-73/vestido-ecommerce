import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const url = new URL(request.url);
    const sortBy = url.searchParams.get('sortBy') || 'dateTime'; // Default sorting by dateTime
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';

    const orders = await listAdminOrders({
      orderBy: {
        [sortBy]: sortOrder === 'desc' ? 'desc' : 'asc', // Apply sorting
      },
    });
    return orders;
  },
);
