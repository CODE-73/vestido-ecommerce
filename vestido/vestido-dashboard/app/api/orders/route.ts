import { OrderStatus } from '@prisma/client';

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
    const orderStatusParam = url.searchParams.get('orderStatus');

    // Split `orderStatus` into an array if it exists and map to valid OrderStatus enums
    const orderStatus: OrderStatus[] = orderStatusParam
      ? orderStatusParam
          .split(',')
          .map((status) => status.trim()) // Split by commas and trim spaces
          .filter((status) =>
            Object.values(OrderStatus).includes(status as OrderStatus),
          ) // Ensure it's a valid OrderStatus
          .map((status) => status as OrderStatus) // Convert string to enum value
      : [];

    const orders = await listAdminOrders(sortBy, sortOrder, orderStatus);

    return orders;
  },
);
