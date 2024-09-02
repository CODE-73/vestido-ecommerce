import { ItemUpsertRequest, ItemUpsertResponse } from './types';

export async function upsertItem(
  args: ItemUpsertRequest,
  headers?: Record<string, string>,
): Promise<ItemUpsertResponse> {
  let url = '/api/items';
  let method = 'POST';
  const itemId = args.id;

  if (itemId) {
    url = `/api/items/${encodeURIComponent(itemId)}`;
    method = 'PUT';
  }
  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(headers ?? {}),
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    throw new Error('Error Upserting Item');
  }

  const data = await r.json();
  return data as ItemUpsertResponse;
}
