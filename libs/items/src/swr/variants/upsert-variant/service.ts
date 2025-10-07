import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { VariantUpsertRequest, VariantUpsertResponse } from './types';

export async function upsertVariant(
  args: VariantUpsertRequest,
  itemId: string,
): Promise<VariantUpsertResponse> {
  let url = `/api/items/${itemId}/variants`;
  let method = 'POST';
  const variantId = args.id;

  if (variantId) {
    url = `/api/items/${itemId}/variants/${encodeURIComponent(variantId)}`;
    method = 'PUT';
  }

  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as VariantUpsertResponse;
}
