import { z } from 'zod';

export const CreateRPPaymentSchema = z.object({
  key_id: z.string(),
  amount: z.coerce.number(),
  currency: z.string(),
  name: z.string(),
  description: z.string(),
  order_id: z.string(), // assuming order_id is a string; adjust if it should be a different type
  handler: z.function().args(z.any()).returns(z.promise(z.void())),
  prefill: z.object({
    name: z.string(),
    email: z.string(),
    contact: z.string(),
  }),
  notes: z.object({
    address: z.string(),
  }),
  theme: z.object({
    color: z.string(),
  }),
});

export type CreateRPPaymentSchemaType = z.infer<typeof CreateRPPaymentSchema>;
