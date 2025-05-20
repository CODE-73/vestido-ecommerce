import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter, OrderCountTrendResponse } from '../../services';
import { OrderCountSWRKeys } from './keys';
import { getOrderCountTrend } from './service';

export function useOrderCount(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    OrderCountSWRKeys.ORDER,
    OrderCountSWRKeys.COUNT,
    JSON.stringify(args),
  ];

  return useSWRImmutable<OrderCountTrendResponse, Error>(key, () =>
    getOrderCountTrend({ ...args }, authHeaders),
  );
}
