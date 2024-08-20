import { z } from 'zod';

export const UpdateFulfillmentSchema = z.object({
  length: z.number().optional(),
  breadth: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  //orderItems: z.array(FulfillmentItemSchema),
});

export type UpdateFulfillmentSchemaType = z.infer<
  typeof UpdateFulfillmentSchema
>;
