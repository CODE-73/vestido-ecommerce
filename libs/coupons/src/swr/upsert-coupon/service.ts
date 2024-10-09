import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { UpsertCouponRequest, UpsertCouponResponse } from './types';

export async function upsertCoupon(
  args: UpsertCouponRequest,
  headers?: Record<string, string>,
): Promise<UpsertCouponResponse> {
  let url = '/api/coupons';
  let method = 'POST';

  if ('id' in args && args.id) {
    url = `/api/coupons/${encodeURIComponent(args.id)}`;
    method = 'PUT';
  }

  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as UpsertCouponResponse;
}
