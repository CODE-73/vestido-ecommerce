import { ListCategoryRequest } from 'libs/items/src/services';

import { ListCategoryResponse } from './types';

export async function getCategoriesList(
  args: ListCategoryRequest
): Promise<ListCategoryResponse> {
  let url = '/api/categories';

  if (args.q) {
    const encodedQuery = encodeURIComponent(args.q);
    url += `?q=${encodedQuery}`;
  }
  const r = await fetch(url);

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  return data as ListCategoryResponse;
}
