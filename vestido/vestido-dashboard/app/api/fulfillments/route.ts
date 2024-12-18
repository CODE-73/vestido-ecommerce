import { FulfillmentStatus } from '@prisma/client';

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
    const fulfillmentStatusParam = url.searchParams.get('fulfillmentStatus');

    // Split `orderStatus` into an array if it exists and map to valid OrderStatus enums
    const fulfillmentStatus: FulfillmentStatus[] = fulfillmentStatusParam
      ? fulfillmentStatusParam
          .split(',')
          .map((status) => status.trim()) // Split by commas and trim spaces
          .filter((status) =>
            Object.values(FulfillmentStatus).includes(
              status as FulfillmentStatus,
            ),
          ) // Ensure it's a valid OrderStatus
          .map((status) => status as FulfillmentStatus) // Convert string to enum value
      : [];

    const fulfillments = await getFulfillmentList(
      sortBy,
      sortOrder,
      fulfillmentStatus,
    );

    return fulfillments;
  },
);
