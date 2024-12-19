import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

// Define Zod schema for query parameters
const listAdminOrdersSchema = z.object({
  column: z.string().default('dateTime'), // Default sorting by dateTime
  direction: z.enum(['asc', 'desc']).default('asc'), // Default order is ascending
  orderStatus: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value
            .split(',')
            .map((status) => status.trim())
            .filter((status) =>
              Object.values(OrderStatus).includes(status as OrderStatus),
            )
            .map((status) => status as OrderStatus)
        : [],
    ), // Transform to an array of valid OrderStatus enums
});

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    // Extract search parameters and validate using Zod
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries(),
    );
    const validatedData = listAdminOrdersSchema.parse(params);

    const orders = await listAdminOrders(validatedData);

    return orders;
  },
);
