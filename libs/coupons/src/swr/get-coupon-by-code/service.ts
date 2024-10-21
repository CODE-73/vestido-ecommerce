import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetCouponByCodeResponse } from './types';

export async function getCouponByCode(
  couponCode: string,
  authHeaders: Record<string, string>,
): Promise<GetCouponByCodeResponse> {
  const url = `/api/coupons/${encodeURIComponent(couponCode)}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetCouponByCodeResponse;
}
