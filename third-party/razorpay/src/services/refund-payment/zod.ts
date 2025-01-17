import { z } from 'zod';

export const RefundRazorpaySchema = z.object({
  paymentId: z.string(),
  amount: z.coerce.number(),
  receipt: z.string().optional(),
  notes: z.string().optional(),
});

export type RefundRazorpaySchemaType = z.infer<typeof RefundRazorpaySchema>;
