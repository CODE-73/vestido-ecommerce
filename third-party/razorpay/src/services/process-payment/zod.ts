import { z } from 'zod';

export const verifyRPSignSchema = z.object({
  paymentId: z.string(),
  order_id: z.string(),
  payment_RP_id: z.string(),
  razorpay_signature: z.string(),
});

export type verifyRPSignSchemaType = z.infer<typeof verifyRPSignSchema>;
