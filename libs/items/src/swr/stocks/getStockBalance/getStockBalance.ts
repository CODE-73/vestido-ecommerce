import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { getStockBalanceSWRResponse } from 'libs/items/src/services/stocks';
import { StockSWRKeys } from '../keys';
import { getStockBalance } from './service';

export function useStockBal(args: string | null) {
  const { authHeaders } = useAuth();
  const key = [StockSWRKeys.STOCKBALANCE, StockSWRKeys.GET, itemId];
  return useSWRImmutable<getStockBalanceSWRResponse, Error>(
    key,
    () => getStockBalance({ ...args }, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
