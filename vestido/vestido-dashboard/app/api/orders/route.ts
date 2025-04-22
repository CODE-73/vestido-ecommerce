import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import {
  apiRouteHandler,
  OrderByQueryParamSchema,
  PaginationQueryParamSchema,
} from '@vestido-ecommerce/utils';

// Define Zod schema for query parameters
const ListAdminOrdersSchema = z
  .object({
    q: z.string().optional(),
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
    from: z.string().optional(),
    to: z.string().optional(),
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
    const validatedData = ListAdminOrdersSchema.parse(params);

    const orders = await listAdminOrders(validatedData);

    return orders;
  },
);
