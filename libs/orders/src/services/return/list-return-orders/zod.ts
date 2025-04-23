import { ReturnStatus } from '@prisma/client';
import { z } from 'zod';

import { OrderByFieldSchema } from '@vestido-ecommerce/utils';
import {
  OrderByQueryParamSchema,
  PaginationQueryParamSchema,
} from '@vestido-ecommerce/utils';

export const ListReturnSchema = z
  .object({
    q: z.string().optional(),
    returnStatus: z
      .string()
      .optional()
      .transform((value) =>
        value
          ? value
              .split(',')
              .map((status) => status.trim())
              .filter((status) =>
                Object.values(ReturnStatus).includes(status as ReturnStatus),
              )
              .map((status) => status as ReturnStatus)
          : [],
      ),
    orderBy: z.array(OrderByFieldSchema).optional(),
    start: z.number().optional(),
    limit: z.number().optional().default(20),
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

export type ListReturnSchemaType = z.infer<typeof ListReturnSchema>;
