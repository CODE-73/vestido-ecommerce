import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { RevenueSWRKeys } from './keys';
import { getRevenueTrend } from './service';
import { RevenueOverTimeResponse } from './types';

export function useRevenueAmount(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    RevenueSWRKeys.REVENUE,
    RevenueSWRKeys.AMOUNT,
    JSON.stringify(args),
  ];

  return useSWRImmutable<RevenueOverTimeResponse, Error>(key, () =>
    getRevenueTrend({ ...args }, authHeaders),
  );
}
