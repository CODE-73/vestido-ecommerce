import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CreateCouponArgs } from '../../services';
import { CreateCouponResponse } from './types';

export async function createCoupon(
  args: CreateCouponArgs,
  authHeaders: Record<string, string>,
): Promise<CreateCouponResponse> {
  const url = '/api/coupons';

  const r = await fetch(url, {
    method: 'POST',
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

  return data as CreateCouponResponse;
}
