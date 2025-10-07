import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { UpsertAttributeRequest, UpsertAttributeResponse } from './types';

export async function upsertAttribute(
  args: UpsertAttributeRequest,
  headers?: Record<string, string>,
): Promise<UpsertAttributeResponse> {
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
      ...headers,
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as UpsertAttributeResponse;
}
