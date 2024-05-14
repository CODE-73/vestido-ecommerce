import { CategoryListResponse } from './types';

export async function getCategoriesList(
  query?: string
): Promise<CategoryListResponse> {
  const r = await fetch('/api/categories');
  console.log(r);

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  console.log('the categories list is below', data);
  return data as CategoryListResponse;
}
