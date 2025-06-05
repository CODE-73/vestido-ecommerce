import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { BaseReportFilter } from '../../services';
import { RefundRateResponse } from './types';

export async function getRefundRate(
  args: BaseReportFilter,
  headers?: Record<string, string>,
): Promise<RefundRateResponse> {
  const path = '/api/widgets/refund-rate';

  const query = new URLSearchParams({
    fromDate: args.fromDate,
    toDate: args.toDate,
    groupBy: args.groupBy,
  });

  const fullUrl = `${path}?${query.toString()}`;

  const r = await fetch(fullUrl, {
    headers: {
      ...headers,
    },
  });

  if (!r.ok) {
    await handleVestidoErrorResponse(r);
  }

  const data = await r.json();
  return data;
}
