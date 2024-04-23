import { ItemDetailsResponse } from '../../../services/get-item/types';

export async function getItemDetails(
  itemId: string
): Promise<ItemDetailsResponse> {
  const url = `/api/items/${encodeURIComponent(itemId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching Item Details');
  }
  const data = await r.json();

  return data as ItemDetailsResponse;
}
