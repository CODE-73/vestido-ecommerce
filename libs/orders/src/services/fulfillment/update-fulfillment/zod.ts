import { z } from 'zod';

export const FulfillmentItemSchema = z.object({
  fulfillmentItemId: z.string().optional(),
  orderItemId: z.string().uuid(),
  quantity: z.number().int(),
});

export const UpdateFulfillmentSchema = z.object({
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  items: z.array(FulfillmentItemSchema),
});

export type UpdateFulfillmentSchemaType = z.infer<
  typeof UpdateFulfillmentSchema
>;
