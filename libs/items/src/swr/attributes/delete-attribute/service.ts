import { DeleteAttributeResponse } from './types';

export async function deleteAttribute(
  attributeId: string
): Promise<DeleteAttributeResponse> {
  const url = `/api/attributes/${encodeURIComponent(attributeId)}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!r.ok) {
    throw new Error('Error Deleting Atttribute');
  }
  const data = await r.json();

  return data as DeleteAttributeResponse;
}
