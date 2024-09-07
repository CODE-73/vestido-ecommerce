import { z } from 'zod';

import { FulfillmentItemSchema } from '../update-fulfillment';

export const submitFulfillmentSchema = z.object({
  length: z.number(),
  breadth: z.number(),
  height: z.number(),
  weight: z.number(),
  fulfillmentItems: z.array(FulfillmentItemSchema),
});
