import { z } from 'zod';

export const RemoveFromCartSchema = z.object({
  itemId: z.string().uuid(),
  customerId: z.string().uuid(),
  variantId: z.string().uuid().nullish(),
  actionType: z.enum(['full', 'decrement']),
});

export type RemoveFromCartSchemaType = z.infer<typeof RemoveFromCartSchema>;
