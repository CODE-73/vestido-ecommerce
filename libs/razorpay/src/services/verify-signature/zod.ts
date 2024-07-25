import { z } from 'zod';

export const verifyRPSignSchema = z.object({
  order_id: z.string(),
  payment_id: z.string(),
  razorpay_signature: z.string(),
});

export type verifyRPSignSchemaType = z.infer<typeof verifyRPSignSchema>;
