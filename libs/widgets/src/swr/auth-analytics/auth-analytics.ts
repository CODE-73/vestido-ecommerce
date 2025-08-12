import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { AuthAnalyticsSWRKeys } from './keys';
import { getAuthAnatytics } from './service';
import { AuthAnalyticsResponse } from './types';

export function useAuthAnalytics(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    AuthAnalyticsSWRKeys.AUTH,
    AuthAnalyticsSWRKeys.ANALYTICS,
    JSON.stringify(args),
  ];

  return useSWRImmutable<AuthAnalyticsResponse, Error>(key, () =>
    getAuthAnatytics({ ...args }, authHeaders),
  );
}
