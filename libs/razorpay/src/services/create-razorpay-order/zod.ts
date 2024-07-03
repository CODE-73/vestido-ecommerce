import { z } from 'zod';

export const CreateRPOrderSchema = z.object({
  orderId: z.string(),
  amount: z.coerce.number(),
  currency: z.string(),
});

export type CreateRPOrderSchemaType = z.infer<typeof CreateRPOrderSchema>;
