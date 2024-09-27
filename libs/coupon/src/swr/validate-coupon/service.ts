import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ValidateCouponResponse } from './types';

export async function validateCoupon(
  coupon: string,
  authHeaders: Record<string, string>,
): Promise<ValidateCouponResponse> {
  const url = `/api/coupons/validate/${encodeURIComponent(coupon)}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ValidateCouponResponse;
}
