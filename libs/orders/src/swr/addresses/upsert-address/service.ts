import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { AddressUpsertRequest, AddressUpsertResponse } from './types';

export async function upsertAddress(
  args: AddressUpsertRequest,
  authHeaders: Record<string, string>,
): Promise<AddressUpsertResponse> {
  let url = '/api/addresses';
  let method = 'POST';
  const addressId = args.id;

  if (addressId) {
    url = `/api/addresses/${encodeURIComponent(addressId)}`;
    method = 'PUT';
  }
  const r = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(args),
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as AddressUpsertResponse;
}
