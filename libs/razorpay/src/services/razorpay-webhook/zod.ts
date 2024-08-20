import { z } from 'zod';

export const razorpayWebhookSchema = z.object({
  entity: z.string(),
  account_id: z.string(),
  event: z.string(),
  contains: z.array(z.string()),
  payload: z.object({
    payment: z.object({
      entity: z.record(z.any()),
    }),
  }),
  created_at: z.number(),
  signature: z.string(),
});

export type RazorpayWebhookSchemaType = z.infer<typeof razorpayWebhookSchema>;
