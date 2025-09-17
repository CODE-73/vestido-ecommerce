import useSWRMutation from 'swr/mutation'
import { useAuth } from '@vestido-ecommerce/auth/client'

import {
  ReconcileStockRequest,
  ReconcileStockResponse,
} from 'libs/items/src/services/stocks'
import { StockSWRKeys } from '../keys'
import { reconcileStock } from './service'
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils'

export function useReconcileStock() {
  const { authHeaders } = useAuth()

  return useSWRMutation<ReconcileStockResponse, Error, typeof StockSWRKeys.RECONCILE, ReconcileStockRequest>(
    StockSWRKeys.RECONCILE,
    (_key, { arg }) => reconcileStock(arg, authHeaders), {...useClearCacheOnSuccess( StockSWRKeys.STOCKBALANCE)}
  )
}