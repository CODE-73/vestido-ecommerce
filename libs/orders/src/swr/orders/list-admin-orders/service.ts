import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders/types';

export async function getAdminOrderList(
  authHeaders: Record<string, string>,
  sortBy: string,
  sortOrder: string,
): Promise<ListAdminOrderResponse> {
  const r = await fetch(`/api/orders?sortBy=${sortBy}&sortOrder=${sortOrder}`, {
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
