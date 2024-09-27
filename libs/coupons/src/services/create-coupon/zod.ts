import { z } from 'zod';

export const CreateCouponSchema = z.object({
  coupon: z.string(),
  description: z.string(),
  fromDate: z.string(),
  toDate: z.string(),
  enabled: z.boolean(),
  discountType: z.enum(['PERCENTAGE', 'AMOUNT']),
  discountPercent: z.coerce.number().default(0),
  discountAmount: z.coerce.number().default(0),
});

export type CreateCouponSchemaType = z.infer<typeof CreateCouponSchema>;
