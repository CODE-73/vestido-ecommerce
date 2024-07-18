import { DeleteItemRequest, DeleteItemResponse } from './types';

export async function deleteItem(
  args: DeleteItemRequest
): Promise<DeleteItemResponse> {
  const url = `/api/items/${encodeURIComponent(args.itemId)}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!r.ok) {
    throw new Error('Error Deleting Item');
  }
  return true as DeleteItemResponse;
}
