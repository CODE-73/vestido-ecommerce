import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListCategoryRequest } from '../../../services/categories/list-category/types';
import { ListCategoryResponse } from './types';

export async function getCategoriesList(
  args: ListCategoryRequest,
  headers?: Record<string, string>,
): Promise<ListCategoryResponse> {
  const url = '/api/categories';
  if (args) {
    const query = new URLSearchParams();
    if (args.q) {
      query.append('q', args.q);
    }
    if (args.enabled) {
      query.append('enabled', args.enabled ? 'true' : 'false');
    }
    if (Array.isArray(args.gender) && args.gender.length > 0) {
      query.append('gender', args.gender.join(',')); // Join array elements into a comma-separated string
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
