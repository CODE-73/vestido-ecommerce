import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListReturnOrderSWRResponse } from '../../../services';

export async function getReturnOrdersList(
  authHeaders: Record<string, string>,
): Promise<ListReturnOrderSWRResponse> {
  const url = '/api/returns';
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ListReturnOrderSWRResponse;
}
