import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListOrderResponse } from '../../../services/orders/list-order/types';

export async function getOrderList(
  authHeaders: Record<string, string>,
): Promise<ListOrderResponse> {
  const r = await fetch('/api/orders', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as ListOrderResponse;
}
