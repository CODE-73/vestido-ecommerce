import { z } from 'zod';

import { FulfillmentItemSchema } from '../update-fulfillment';

export const CreateFulfillmentSchema = z.object({
  orderId: z.string().uuid(),
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  items: z.array(FulfillmentItemSchema),
  pickup_location: z.string().optional(),
});

export type CreateFulfillmentSchemaType = z.infer<
  typeof CreateFulfillmentSchema
>;
