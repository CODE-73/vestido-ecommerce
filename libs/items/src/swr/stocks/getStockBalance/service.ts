import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  getStockBalanceResponse,
  getStockBalanceRequest,
} from 'libs/items/src/services/stocks';

export async function getStockBalance(
  args: getStockBalanceRequest,
  headers?: Record<string, string>,
): Promise<getStockBalanceResponse> {
  const url = `/api/stocks/`;
  const r = await fetch(url, {
    headers: {
      ...(headers ?? {}),
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as getStockBalanceResponse;
}
