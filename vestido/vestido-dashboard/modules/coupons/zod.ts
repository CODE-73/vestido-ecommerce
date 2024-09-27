import * as z from 'zod';

import { GetCouponResult } from '@vestido-ecommerce/coupons';

export const UpsertCouponFormSchema = z.object({
  id: z.string().nullish(),
  coupon: z.string(),
  description: z.string(),
  fromDate: z.string(),
  toDate: z.string(),
  enabled: z.boolean(),
  discountType: z.enum(['PERCENTAGE', 'AMOUNT']),
  discountPercent: z.coerce.number().default(0),
  discountAmount: z.coerce.number().default(0),
});

export type UpsertCouponForm = z.infer<typeof UpsertCouponFormSchema>;

export const CreateCouponFormDefaultValues = {
  coupon: '',
  description: '',
  fromDate: new Date().toISOString(),
  toDate: new Date().toISOString(),
  enabled: true,
  discountType: 'PERCENTAGE',
  discountAmount: 0,
  discountPercent: 0,
} satisfies UpsertCouponForm;

export function parseCouponDetails(coupon: GetCouponResult) {
  if (!coupon) {
    return {
      ...CreateCouponFormDefaultValues,
    };
  }

  return structuredClone({
    ...coupon,
    fromDate: new Date(coupon.fromDate).toISOString(),
    toDate: new Date(coupon.toDate).toISOString(),
  } satisfies UpsertCouponForm);
}
