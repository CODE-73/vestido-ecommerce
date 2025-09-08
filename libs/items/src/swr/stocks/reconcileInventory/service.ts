import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  stockUpdateRequest,
  stockUpdateResponse,
} from 'libs/items/src/services/stocks';

export async function reconcileInventory(
  args: stockUpdateRequest,
  headers?: Record<string, string>,
): Promise<stockUpdateResponse> {
  const url = `/api/stocks/update`;

  const r = await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: JSON.stringify(args),
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as stockUpdateResponse;
}
