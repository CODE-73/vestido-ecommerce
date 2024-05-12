import { CategoryUpsertRequest, CategoryUpsertResponse } from './types';

export async function upsertCategory(
  args: CategoryUpsertRequest
): Promise<CategoryUpsertResponse> {
  let url = '/api/categories';
  let method = 'POST';
  const categoryId = args.data.id;

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
    throw new Error('Error Upserting Item');
  }

  const data = await r.json();
  return data as CategoryUpsertResponse;
}
