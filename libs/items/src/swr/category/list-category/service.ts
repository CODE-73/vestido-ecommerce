import { CategoryListResponse } from './types';

export async function getCategoriesList(
  query?: string
): Promise<CategoryListResponse> {
  let url = '/api/categories';
  const r = await fetch(url);
  console.log(r);

  if (query) {
    // Make sure the query is URI encoded to handle spaces and special characters
    const encodedQuery = encodeURIComponent(query);
    url += `&filters=[["employee_name", "like", "%${encodedQuery}%"]]`;
  }

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  console.log('the categories list is below', data);
  return data as CategoryListResponse;
}
