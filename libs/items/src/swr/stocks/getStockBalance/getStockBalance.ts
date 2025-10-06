import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { GetStockBalanceResponse } from 'libs/items/src/services/stocks';
import { StockSWRKeys } from '../keys';
import { getStockBalance } from './service';

export function useStockBalance(args: string | null) {
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
