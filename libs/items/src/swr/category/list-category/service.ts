import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListCategoryRequest } from '../../../services/categories/list-category/types';
import { ListCategoryResponse } from './types';

export async function getCategoriesList(
  args: ListCategoryRequest,
  headers?: Record<string, string>,
): Promise<ListCategoryResponse> {
  let url = '/api/categories';
  if (args) {
    const query = new URLSearchParams();
    if (args.q) {
      query.append('q', args.q);
    }
    if ('enabled' in args) {
      query.append('enabled', args.enabled ? 'true' : 'false');
    }

    if (args.gender) {
      query.append('gender', args.gender); // Join array elements into a comma-separated string
    }
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
  return data as ListCategoryResponse;
}
