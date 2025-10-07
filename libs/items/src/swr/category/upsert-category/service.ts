import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CategoryUpsertRequest, CategoryUpsertResponse } from './types';

export async function upsertCategory(
  args: CategoryUpsertRequest,
  headers?: Record<string, string>,
): Promise<CategoryUpsertResponse> {
  let url = '/api/categories';
  let method = 'POST';
  const categoryId = args.id;

  if (categoryId) {
    url = `/api/categories/${encodeURIComponent(categoryId)}`;
    method = 'PUT';
  }

  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as CategoryUpsertResponse;
}
