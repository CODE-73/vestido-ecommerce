import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAddressResponse } from '../../../services/address/list-address/types';

export async function getAddressList(
  authHeaders: Record<string, string>,
): Promise<ListAddressResponse> {
  const r = await fetch('/api/addresses', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as ListAddressResponse;
}
