import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListItemRequest } from '../../../services/items/list-item/types';
import { ListItemResponse } from './types';

export async function getItemList(
  args?: ListItemRequest,
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
    if (query.toString()) {
      url += `?${query.toString()}`;
    }
  }

  const r = await fetch(url);

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data.data as ListItemResponse;
}
