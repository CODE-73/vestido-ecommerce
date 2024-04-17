import { object, z } from 'zod';

export const AddToCartSchema = z.object({
  itemId: z.string(),
  customerId: z.string(),
});

export type AddToCartSchemaType = z.infer<typeof AddToCartSchema>;
