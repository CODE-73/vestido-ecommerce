import { z } from 'zod';

export const UpdateCouponSchema = z.object({
  id: z.string(),
  coupon: z.string(),
  description: z.string(),
  fromDate: z.string(),
  toDate: z.string(),
  enabled: z.boolean(),
  discountType: z.enum(['PERCENTAGE', 'AMOUNT']),
  discountPercent: z.number(),
  discountAmount: z.number(),
});

export type UpdateCouponSchemaType = z.infer<typeof UpdateCouponSchema>;
