import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import {
  OrderByQueryParamSchema,
  PaginationQueryParamSchema,
} from '@vestido-ecommerce/utils';
import { OrderByFieldSchema } from '@vestido-ecommerce/utils';

export const listAdminOrdersSchema = z
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
      ),
    orderBy: z.array(OrderByFieldSchema).optional(),
    start: z.number().optional(),
    limit: z.number().optional(),
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

export type listAdminOrdersType = z.infer<typeof listAdminOrdersSchema>;
