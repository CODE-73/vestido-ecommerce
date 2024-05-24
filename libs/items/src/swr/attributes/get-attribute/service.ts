import { AttributeDetailsResponse } from '../../../services/attributes/get-attribute/types';

export async function getAttributeDetails(
  attributeId: string
): Promise<AttributeDetailsResponse> {
  const url = `/api/attributes/${encodeURIComponent(attributeId)}`;
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error('Error Fetching Atttribute Details');
  }
  const data = await r.json();

  return data as AttributeDetailsResponse;
}
