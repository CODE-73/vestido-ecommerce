import { z } from 'zod';

export const FulfillmentItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.number().int(),
});

export const CreateFulfillmentSchema = z.object({
  orderId: z.string().uuid(),
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  items: z.array(FulfillmentItemSchema),
});

export type CreateFulfillmentSchemaType = z.infer<
  typeof CreateFulfillmentSchema
>;
