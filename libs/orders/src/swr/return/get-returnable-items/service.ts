import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetReturnableitemsSWRResponse } from '../../../services';

export async function getReturnableItems(
  orderId: string,
  authHeaders: Record<string, string>,
): Promise<GetReturnableitemsSWRResponse> {
  const url = `/api/orders/${encodeURIComponent(orderId)}/returnable-items`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetReturnableitemsSWRResponse;
}
