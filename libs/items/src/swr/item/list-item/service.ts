import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListItemRequest } from '../../../services/items/list-item/types';
import { ListItemResponse } from './types';

export async function getItemList(
  args?: ListItemRequest,
  headers?: Record<string, string>,
): Promise<ListItemResponse> {
  let url = '/api/items';

  if (args) {
    const query = new URLSearchParams();
    if (args.q) {
      query.append('q', args.q);
    }
    if (args.categoryId) {
      query.append('categoryId', args.categoryId);
    }
    if (args.limit != null) query.append('limit', String(args.limit));
    if (args.offset != null) query.append('offset', String(args.offset));
    if (query.toString()) {
      url += `?${query.toString()}`;
    }
  }

  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data.data as ListItemResponse;
}
