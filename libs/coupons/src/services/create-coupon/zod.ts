import { z } from 'zod';

export const CreateCouponSchema = z.object({
  coupon: z.string(),
  description: z.string(),
  fromDate: z.string().transform((str) => new Date(str)),
  toDate: z.string().transform((str) => new Date(str)),
  enabled: z.boolean(),
  discountType: z.enum(['PERCENTAGE', 'AMOUNT']),
  discountPercent: z.number(),
  discountAmount: z.number(),
});

export type CreateCouponSchemaType = z.infer<typeof CreateCouponSchema>;