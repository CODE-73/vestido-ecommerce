import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  ReconcileStockRequest,
  ReconcileStockResponse,
} from 'libs/items/src/services/stocks';

export async function reconcileStock(
  args: ReconcileStockRequest,
  headers?: Record<string, string>,
): Promise<ReconcileStockResponse> {
  const url = `/api/items/${args.itemId}/stock`;

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
  return data as ReconcileStockResponse;
}
