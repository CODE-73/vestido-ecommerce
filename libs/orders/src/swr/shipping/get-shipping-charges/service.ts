import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  shippingChargesRequest,
  shippingChargesResponse,
} from '../../../services/shipping/get-shipping-charge/types';

export async function getShipping(
  args: shippingChargesRequest,
  authHeaders: Record<string, string>,
): Promise<shippingChargesResponse> {
  const r = await fetch('/api/shipping/calculate', {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as shippingChargesResponse;
}
