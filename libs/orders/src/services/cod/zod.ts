import { z } from 'zod';

export const CreateCODSchema = z.object({
  orderId: z.string(),
  amount: z.coerce.number(),
  currency: z.string(),
});

export type CreateCODSchemaType = z.infer<typeof CreateCODSchema>;
