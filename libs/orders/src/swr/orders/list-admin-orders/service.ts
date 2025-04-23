import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  ListAdminOrderRequest,
  ListAdminOrderResponse,
} from '../../../services/orders/list-admin-orders/types';

export async function getAdminOrderList(
  authHeaders: Record<string, string>,
  args?: ListAdminOrderRequest,
): Promise<ListAdminOrderResponse> {
  // Construct the query string
  const params = new URLSearchParams({
    ...(args?.orderStatus?.length
      ? { orderStatus: args.orderStatus.join(',') }
      : {}),
    ...(args?.q ? { q: args.q } : {}),
    ...(args?.start ? { start: args.start.toString() } : {}),
    ...(args?.limit ? { limit: args.limit.toString() } : {}),
  });

  if (args?.orderBy && args.orderBy.length > 0) {
    const orderByValue = args.orderBy
      .map((field) => `${field.column}:${field.direction}`)
      .join(',');
    params.append('orderBy', orderByValue);
  }
  if (args?.fromDate) params.append('fromDate', args.fromDate);
  if (args?.toDate) params.append('toDate', args.toDate);

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
