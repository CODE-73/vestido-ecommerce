import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { PickupLocationResponse } from '../../../services';

export async function getPickupLoc(
  headers?: Record<string, string>,
): Promise<PickupLocationResponse> {
  const url = `/api/fulfillments/pickup-locations`;
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as PickupLocationResponse;
}
