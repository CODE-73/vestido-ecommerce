import { z } from 'zod';

export const FulfillmentItemSchema = z.object({
  id: z.string().optional(),
  orderItemId: z.string().uuid(),
  quantity: z.number().int(),
});

export const UpdateFulfillmentSchema = z.object({
  id: z.string().optional(),
  length: z.number().nullable(),
  breadth: z.number().nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  description: z.string().nullable(),
  pickup_location: z.string().nullable(),
  items: z.array(FulfillmentItemSchema),
});

export type UpdateFulfillmentSchemaType = z.infer<
  typeof UpdateFulfillmentSchema
>;
