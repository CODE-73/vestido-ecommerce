import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { listAdminOrders } from '@vestido-ecommerce/orders';
import { apiRouteHandler, OrderByFieldSchema } from '@vestido-ecommerce/utils';

// Define Zod schema for query parameters
const listAdminOrdersSchema = z.object({
  q: z.string().optional(),
  orderBy: z
    .string()
    .optional()
    .transform(
      (value) =>
        value
          ? value.split(',').map((field) => {
              const [column, direction] = field.split(':');
              return OrderByFieldSchema.parse({ column, direction });
            })
          : [{ column: 'createdAt', direction: 'asc' as const }], // Default sorting
    ),
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
  start: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : 0)), // Defaults to 0
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? parseInt(value, 10) : 20)),
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
