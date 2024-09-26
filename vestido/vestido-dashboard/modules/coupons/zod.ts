import * as z from 'zod';

import {
  CreateCouponSchema,
  GetCouponResult,
  UpdateCouponSchema,
} from '@vestido-ecommerce/coupons';

export const CreateCouponFormSchema = CreateCouponSchema;

export const UpdateCouponFormSchema = UpdateCouponSchema;

export type CreateCouponForm = z.infer<typeof CreateCouponFormSchema>;
export type UpdateCouponForm = z.infer<typeof UpdateCouponFormSchema>;

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
    ...coupon,
    fromDate: new Date(coupon.fromDate).toISOString(),
    toDate: new Date(coupon.toDate).toISOString(),
  } satisfies UpdateCouponForm);
}
