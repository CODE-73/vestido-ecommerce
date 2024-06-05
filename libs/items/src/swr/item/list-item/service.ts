import { ListItemResponse } from './types';
import { ListItemRequest } from 'libs/items/src/services';

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
