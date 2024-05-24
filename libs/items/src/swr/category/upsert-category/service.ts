import { categoryUpsertRequest, categoryUpsertResponse } from './types';

export async function upsertCategory(
  args: categoryUpsertRequest
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
  console.log('r is', r);
  if (!r.ok) {
    throw new Error('Error Upserting Category');
  }

  const data = await r.json();
  console.log('data from swr service is', data);
  return data as categoryUpsertResponse;
}
