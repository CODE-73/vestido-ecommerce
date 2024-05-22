import { z } from 'zod';

export const AddToWishlistSchema = z.object({
  itemId: z.string(),
  customerId: z.string(),
});

export type AddToWishlistSchemaType = z.infer<typeof AddToWishlistSchema>;
