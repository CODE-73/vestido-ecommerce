import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders/types';

export async function getAdminOrderList(
  authHeaders: Record<string, string>,
): Promise<ListAdminOrderResponse> {
  const r = await fetch('/api/orders', {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data as ListAdminOrderResponse;
}
