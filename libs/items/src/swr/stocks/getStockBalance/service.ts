import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { GetStockBalanceRequest, GetStockBalanceResponse } from './types';

export async function getStockBalance(
  args: GetStockBalanceRequest,
  headers?: Record<string, string>,
): Promise<GetStockBalanceResponse> {
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

  return data as GetStockBalanceResponse;
}
