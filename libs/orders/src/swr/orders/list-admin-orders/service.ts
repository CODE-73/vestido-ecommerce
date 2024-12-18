import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { ListAdminOrderResponse } from '../../../services/orders/list-admin-orders/types';

export async function getAdminOrderList(
  authHeaders: Record<string, string>,
  sortBy: string,
  sortOrder: string,
  orderStatus?: string[],
): Promise<ListAdminOrderResponse> {
  // Construct the query string
  const params = new URLSearchParams({
    sortBy,
    sortOrder,
    ...(orderStatus?.length ? { orderStatus: orderStatus.join(',') } : {}),
  });

  // Append the query string to the URL
  const url = `/api/orders?${params.toString()}`;

  const r = await fetch(url, {
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
