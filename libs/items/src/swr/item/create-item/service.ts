import { ItemUpsertRequest, ItemUpsertResponse } from './types';

export async function upsertItem(
  args: ItemUpsertRequest
): Promise<ItemUpsertResponse> {
  let url = '/api/items';
  let method = 'POST';
  const itemId = args.data.id;

  if (itemId) {
    url = `/api/items/${encodeURIComponent(itemId)}`;
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
    throw new Error('Error Upserting Patient');
  }

  const data = await r.json();
  return data as ItemUpsertResponse;
}
