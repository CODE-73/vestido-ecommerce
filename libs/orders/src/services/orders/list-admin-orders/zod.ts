import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import { OrderByFieldSchema } from '@vestido-ecommerce/utils';

export const listAdminOrdersSchema = z.object({
  q: z.string().optional(),
  orderStatus: z.nativeEnum(OrderStatus).array().optional(),
  orderBy: z.array(OrderByFieldSchema).optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
});

export type listAdminOrdersType = z.infer<typeof listAdminOrdersSchema>;
