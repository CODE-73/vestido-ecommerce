import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

import { OrderByFieldSchema } from '@vestido-ecommerce/utils';

export const listAdminOrdersSchema = z.object({
  q: z.string().optional(), // random search by text.. we will do an OR filtering between common fields (title, customer.customer_name, description, slug.. sku..)
  orderStatus: z.nativeEnum(OrderStatus).array().optional(),
  orderBy: z.array(OrderByFieldSchema).optional(),
  start: z.number().optional(),
  limit: z.number().optional().default(20),
});

export type listAdminOrdersType = z.infer<typeof listAdminOrdersSchema>;
