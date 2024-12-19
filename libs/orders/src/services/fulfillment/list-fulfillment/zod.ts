import { FulfillmentStatus } from '@prisma/client';
import { z } from 'zod';

import { OrderByFieldSchema } from '@vestido-ecommerce/utils';

export const ListFulfillmentSchema = z.object({
  q: z.string().optional(),
  fulfillmentStatus: z.nativeEnum(FulfillmentStatus).array().optional(),
  orderBy: z.array(OrderByFieldSchema).optional(),
  // pagination (offset pagination in Postgres)
  // start: number?
  // limit: number? @deafult(20)
});

export type ListFulfillmentSchemaType = z.infer<typeof ListFulfillmentSchema>;
