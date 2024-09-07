import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { categoryUpsertRequest, categoryUpsertResponse } from './types';

export async function upsertCategory(
  args: categoryUpsertRequest,
): Promise<categoryUpsertResponse> {
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
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as categoryUpsertResponse;
}
