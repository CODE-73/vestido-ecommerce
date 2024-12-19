import { FulfillmentStatus } from '@prisma/client';
import { z } from 'zod';

import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getFulfillmentList } from '@vestido-ecommerce/orders';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

// Define Zod schema for query parameters
const listFulfillmentSchema = z.object({
  column: z.string().default('dateTime'), // Default sorting by dateTime
  direction: z.enum(['asc', 'desc']).default('asc'), // Default order is ascending
  fulfillmentStatus: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value
            .split(',')
            .map((status) => status.trim())
            .filter((status) =>
              Object.values(FulfillmentStatus).includes(
                status as FulfillmentStatus,
              ),
            )
            .map((status) => status as FulfillmentStatus)
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
    const validatedData = listFulfillmentSchema.parse(params);

    const fulfillments = await getFulfillmentList(validatedData);

    return fulfillments;
  },
);
