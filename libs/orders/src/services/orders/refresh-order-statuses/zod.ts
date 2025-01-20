import { z } from 'zod';

export const RefreshOrderStatusSchema = z.object({
  id: z.string(),
  //  status: z.string(),
  type: z.string(),
});

export type RefreshOrderStatusSchemaType = z.infer<
  typeof RefreshOrderStatusSchema
>;
