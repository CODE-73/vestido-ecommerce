import { attributeDetailsResponse } from './types';

export async function getAttributeDetails(
  attributeId: string
): Promise<attributeDetailsResponse> {
  const url = `/api/attributes/${encodeURIComponent(attributeId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching Atttribute Details');
  }
  const data = await r.json();

  return data as attributeDetailsResponse;
}
