import { z } from 'zod';

export const FulfillmentItemSchema = z.object({
  OrderitemId: z.string().uuid(),
  qty: z.number().int(),
});

export const CreateFulfillmentSchema = z.object({
  orderId: z.string().uuid(),
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  //orderItems: z.array(FulfillmentItemSchema),
});

export type CreateFulfillmentSchemaType = z.infer<
  typeof CreateFulfillmentSchema
>;
