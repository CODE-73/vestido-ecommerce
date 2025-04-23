import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import {
  ListReturnOrderRequest,
  ListReturnOrderResponse,
} from '../../../services';

export async function getReturnOrdersList(
  authHeaders: Record<string, string>,
  args?: ListReturnOrderRequest,
): Promise<ListReturnOrderResponse> {
  const params = new URLSearchParams({
    ...(args?.returnStatus?.length
      ? { orderStatus: args.returnStatus.join(',') }
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

  const url = `/api/returns?${params.toString()}`;
  const r = await fetch(url, {
    headers: {
      ...authHeaders,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }
  const data = await r.json();

  return data as ListReturnOrderResponse;
}
