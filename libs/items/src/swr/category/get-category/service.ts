import { CategoryDetailsResponse } from '../../../services/categories/get-category/types';

export async function getCategoryDetails(
  categoryId: string,
): Promise<CategoryDetailsResponse> {
  const url = `/api/categories/${encodeURIComponent(categoryId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching Category Details');
  }
  const data = await r.json();

  return data as CategoryDetailsResponse;
}
