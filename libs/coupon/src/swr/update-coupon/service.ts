import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { UpdateCouponRequest, UpdateCouponResponse } from './types';

export async function updateCoupon(
  args: UpdateCouponRequest,
  authHeaders: Record<string, string>,
): Promise<UpdateCouponResponse> {
  const url = `/api/coupons/${encodeURIComponent(args.couponId)}`;
  const r = await fetch(url, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as UpdateCouponResponse;
}
