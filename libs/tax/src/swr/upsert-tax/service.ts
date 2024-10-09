import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { UpsertTaxRequest, UpsertTaxResponse } from './types';

export async function upsertTax(
  args: UpsertTaxRequest,
  headers?: Record<string, string>,
): Promise<UpsertTaxResponse> {
  let url = '/api/taxes';
  let method = 'POST';

  if ('id' in args && args.id) {
    url = `/api/taxes/${encodeURIComponent(args.id)}`;
    method = 'PUT';
  }

  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(args),
  });

  if (!r) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as UpsertTaxResponse;
}
