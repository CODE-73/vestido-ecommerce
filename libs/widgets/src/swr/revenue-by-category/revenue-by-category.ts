import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { RevenueByCategorySWRKeys } from './keys';
import { getRevenueByCategory } from './service';
import { RevenueByCategoryResponse } from './types';

export function useRevenueByCategory(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    RevenueByCategorySWRKeys.CATEGORY,
    RevenueByCategorySWRKeys.REVENUE,
    JSON.stringify(args),
  ];

  return useSWRImmutable<RevenueByCategoryResponse, Error>(key, () =>
    getRevenueByCategory({ ...args }, authHeaders),
  );
}
