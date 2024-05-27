import { VariantListResponse } from './types';

export async function getVariantsList(
  itemId: string,
  query?: string
): Promise<VariantListResponse> {
  let url = `/api/items/${itemId}/variants`;
  const r = await fetch(url);
  console.log(r);

  if (query) {
    const encodedQuery = encodeURIComponent(query);
    url += `&filters=[["variant", "like", "%${encodedQuery}%"]]`;
  }

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  return data as VariantListResponse;
}
