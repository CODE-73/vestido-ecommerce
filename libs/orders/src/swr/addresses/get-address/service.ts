import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { CustomerAddressResponse } from '../../../services//address/get-address/types';

export async function getAddressDetails(
  addressId: string,
  headers?: Record<string, string>,
): Promise<CustomerAddressResponse> {
  const url = `/api/addresses/${encodeURIComponent(addressId)}`;
  const r = await fetch(url, {
    headers: {
      ...headers,
    },
  });
  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as CustomerAddressResponse;
}
