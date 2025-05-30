import { handleVestidoErrorResponse } from '@vestido-ecommerce/utils';

import { BaseReportFilter } from '../../services';
import { RevenueByCategoryResponse } from './types';

export async function getRevenueByCategory(
  args: BaseReportFilter,
  headers?: Record<string, string>,
): Promise<RevenueByCategoryResponse> {
  const baseUrl = 'http://localhost:4201/api/widgets/revenue-by-category';

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
