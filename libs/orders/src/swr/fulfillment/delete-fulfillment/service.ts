import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { FulfillmentResponse } from '../../../services';

export async function deleteFulfillmentDetails(
  fulfillmentId: string,
  authHeaders: Record<string, string>,
): Promise<FulfillmentResponse> {
  const r = await fetch(
    `/api/fulfillments/${encodeURIComponent(fulfillmentId)}`,
    {
      method: 'DELETE',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  return (await r.json()) as FulfillmentResponse;
}
