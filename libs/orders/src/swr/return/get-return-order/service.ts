import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetReturnOrderSWRResponse } from '../../../services';

export async function getReturnOrderDetails(
  returnId: string,
  authHeaders: Record<string, string>,
): Promise<GetReturnOrderSWRResponse> {
  const url = `/api/returns/${encodeURIComponent(returnId)}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as GetReturnOrderSWRResponse;
}
