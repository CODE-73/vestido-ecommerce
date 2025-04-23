import { FulfillmentStatus } from '@prisma/client';
import { z } from 'zod';

import {
  OrderByQueryParamSchema,
  PaginationQueryParamSchema,
} from '@vestido-ecommerce/utils';

export const ListFulfillmentSchema = z
  .object({
    q: z.string().optional(),
    // fulfillmentStatus: z.nativeEnum(FulfillmentStatus).array().optional(),
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
    fromDate: z
      .string()
      .date()
      .transform((v) => `${v}T00:00:00Z`)
      .optional(),
    toDate: z
      .string()
      .date()
      .transform((v) => `${v}T00:00:00Z`)
      .optional(),
  })
  .merge(OrderByQueryParamSchema.partial())
  .merge(PaginationQueryParamSchema.partial());

export type ListFulfillmentSchemaType = z.infer<typeof ListFulfillmentSchema>;
