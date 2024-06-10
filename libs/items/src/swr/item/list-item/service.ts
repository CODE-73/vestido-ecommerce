import { ListItemResponse } from './types';
import { ListItemRequest } from '../../../services/items/list-item/types';

export async function getItemList(
  args: ListItemRequest
): Promise<ListItemResponse> {
  let url = '/api/items';

  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }

  const r = await fetch(url);

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  return data.data as ListItemResponse;
}
