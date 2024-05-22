import { z } from 'zod';

export const RemoveFromWishlistSchema = z.object({
  itemId: z.string().uuid(),
  customerId: z.string().uuid(),
});

export type RemoveFromWishlistSchemaType = z.infer<
  typeof RemoveFromWishlistSchema
>;
