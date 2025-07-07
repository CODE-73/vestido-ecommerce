import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { BaseReportFilter } from '../../services';
import { FulfilledOrdersSWRKeys } from './keys';
import { getFulfilledOrders } from './service';
import { FulfilledOrdersResponse } from './types';

export function useFulfilledOrders(args: BaseReportFilter) {
  const { authHeaders } = useAuth();
  const key = [
    FulfilledOrdersSWRKeys.ORDERS,
    FulfilledOrdersSWRKeys.FULFILLED,
    JSON.stringify(args),
  ];

  return useSWRImmutable<FulfilledOrdersResponse, Error>(key, () =>
    getFulfilledOrders({ ...args }, authHeaders),
  );
}
