import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetCouponResponse } from './types';

export async function getCoupon(
  couponId: string,
  authHeaders: Record<string, string>,
): Promise<GetCouponResponse> {
  const url = `/api/coupons/${encodeURIComponent(couponId)}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetCouponResponse;
}
