import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  ReconcileStockRequest,
  ReconcileStockResponse,
} from 'libs/items/src/services/stocks';

export async function reconcileStock(
  args: ReconcileStockRequest,
  headers?: Record<string, string>,
): Promise<ReconcileStockResponse> {
  const url = `/api/items/${args.itemId}${args.itemVariantId ? '/variants/' + args.itemVariantId : ''}/stock`;

  const r = await fetch(url, {
    method: 'PUT',
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
