import { z } from 'zod';

export const RemoveFromCartSchema = z.object({
  itemId: z.string().uuid(),
  customerId: z.string().uuid(),
});

export type RemoveFromCartSchemaType = z.infer<typeof RemoveFromCartSchema>;
