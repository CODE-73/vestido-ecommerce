import { AttributeListResponse } from './types';

export async function getAttributesList(
  query?: string
): Promise<AttributeListResponse> {
  let url = '/api/attributes';
  const r = await fetch(url);
  console.log(r);

  if (query) {
    // Make sure the query is URI encoded to handle spaces and special characters
    const encodedQuery = encodeURIComponent(query);
    url += `&filters=[["attribute", "like", "%${encodedQuery}%"]]`;
  }

  if (!r.ok) {
    throw new Error('Error Fetching List');
  }

  const data = await r.json();
  return data as AttributeListResponse;
}
