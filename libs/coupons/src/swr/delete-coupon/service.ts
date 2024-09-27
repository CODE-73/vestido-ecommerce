import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { DeleteCouponRequest, DeleteCouponResponse } from './types';

export async function deleteCoupon(
  args: DeleteCouponRequest,
  headers?: Record<string, string>,
): Promise<DeleteCouponResponse> {
  const url = `/api/coupons/${encodeURIComponent(args.couponId)}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  return true as DeleteCouponResponse;
}
