import { attributeUpsertRequest, attributeUpsertResponse } from './types';

export async function upsertAttribute(
  args: attributeUpsertRequest,
): Promise<attributeUpsertResponse> {
  let url = '/api/attributes';
  let method = 'POST';
  const attributeId = args.id;

  if (attributeId) {
    url = `/api/attributes/${encodeURIComponent(attributeId)}`;
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
    throw new Error('Error Upserting Attribute');
  }

  const data = await r.json();
  return data as attributeUpsertResponse;
}
