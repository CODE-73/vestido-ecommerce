import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListCouponArgs } from '../../services';
import { ListCouponResponse } from './types';

export async function getCouponsList(
  args: ListCouponArgs,
  authHeaders: Record<string, string>,
): Promise<ListCouponResponse> {
  let url = '/api/coupons';
  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ListCouponResponse;
}
