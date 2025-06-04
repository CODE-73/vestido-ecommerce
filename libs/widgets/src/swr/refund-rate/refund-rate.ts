import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { RefundRateSWRKeys } from './keys';
import { getRefundRate } from './service';
import { RefundRateResponse } from './types';

export function useRefundRate(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    RefundRateSWRKeys.ORDER,
    RefundRateSWRKeys.REFUND,
    JSON.stringify(args),
  ];

  return useSWRImmutable<RefundRateResponse, Error>(key, () =>
    getRefundRate({ ...args }, authHeaders),
  );
}
