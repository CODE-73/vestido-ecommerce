import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { AverageOrderValueSWRKeys } from './keys';
import { getAverageOrderValue } from './service';
import { AverageOrderValueResponse } from './types';

export function useAverageOrderValue(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    AverageOrderValueSWRKeys.ORDER,
    AverageOrderValueSWRKeys.AVO,
    JSON.stringify(args),
  ];

  return useSWRImmutable<AverageOrderValueResponse, Error>(key, () =>
    getAverageOrderValue({ ...args }, authHeaders),
  );
}
