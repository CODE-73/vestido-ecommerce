import * as z from 'zod';

import {
  CreateCouponSchema,
  GetCouponResult,
} from '@vestido-ecommerce/coupons';

export const CreateCouponFormSchema = CreateCouponSchema;

export type CreateCouponForm = z.infer<typeof CreateCouponFormSchema>;

export const CreateCouponFormDefaultValues = {
  coupon: '',
  description: '',
  fromDate: new Date().toISOString(),
  toDate: new Date().toISOString(),
  enabled: true,
  discountType: 'PERCENTAGE',
  discountAmount: 0,
  discountPercent: 0,
} satisfies CreateCouponForm;

export function parseCouponDetails(coupon: GetCouponResult) {
  if (!coupon) {
    return {
      ...CreateCouponFormDefaultValues,
    };
  }

  return structuredClone({
    ...CreateCouponFormDefaultValues,
    ...coupon,
  } satisfies CreateCouponForm);
}
