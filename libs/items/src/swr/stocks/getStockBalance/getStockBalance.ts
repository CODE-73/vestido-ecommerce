import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { StockSWRKeys } from '../keys';
import { getStockBalance } from './service';
import { GetStockBalanceRequest, GetStockBalanceResponse } from './types';

export function useStockBalance(args: GetStockBalanceRequest) {
  const { authHeaders } = useAuth();
  const key = [StockSWRKeys.STOCKBALANCE, StockSWRKeys.GET, args];
  return useSWRImmutable<GetStockBalanceResponse, Error>(
    key,
    () => getStockBalance({ args }, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
