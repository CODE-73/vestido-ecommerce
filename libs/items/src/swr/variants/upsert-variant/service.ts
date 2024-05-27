import { variantUpsertRequest, variantUpsertResponse } from './types';

export async function upsertVariant(
  args: variantUpsertRequest,
  itemId: string
): Promise<variantUpsertResponse> {
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
  console.log('r is', r);
  if (!r.ok) {
    throw new Error('Error Upserting Variant');
  }

  const data = await r.json();
  console.log('data from swr service is', data);
  return data as variantUpsertResponse;
}
