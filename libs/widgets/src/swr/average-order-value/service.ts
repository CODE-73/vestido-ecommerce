import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { BaseReportFilter } from '../../services';
import { AverageOrderValueResponse } from './types';

export async function getAverageOrderValue(
  args: BaseReportFilter,
  headers?: Record<string, string>,
): Promise<AverageOrderValueResponse> {
  const baseUrl = 'http://localhost:4201/api/widgets/average-order-value';

  const query = new URLSearchParams({
    fromDate: args.fromDate,
    toDate: args.toDate,
    groupBy: args.groupBy,
  });

  const fullUrl = `${baseUrl}?${query.toString()}`;

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
