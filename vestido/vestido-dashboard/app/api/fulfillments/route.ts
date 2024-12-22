import { FulfillmentStatus } from '@prisma/client';
import { z } from 'zod';

import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getFulfillmentList } from '@vestido-ecommerce/orders';
import {
  apiRouteHandler,
  OrderByQueryParamSchema,
  PaginationQueryParamSchema,
} from '@vestido-ecommerce/utils';

// Define Zod schema for query parameters
const ListFulfillmentSchema = z
  .object({
    q: z.string().optional(),
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
  })
  .merge(OrderByQueryParamSchema)
  .merge(PaginationQueryParamSchema);

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    // Extract search parameters and validate using Zod
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries(),
    );
    const validatedData = ListFulfillmentSchema.parse(params);

    const fulfillments = await getFulfillmentList(validatedData);

    return fulfillments;
  },
);
