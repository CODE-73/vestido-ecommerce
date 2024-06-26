import { z } from 'zod';

export const AddToCartSchema = z.object({
  itemId: z.string(),
  customerId: z.string(),
  variantId: z.string().uuid().nullish(),
  qty: z.number().int(),
});

export type AddToCartSchemaType = z.infer<typeof AddToCartSchema>;
