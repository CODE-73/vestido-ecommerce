import useSWRMutation from 'swr/mutation'
import { useAuth } from '@vestido-ecommerce/auth/client'

import {
  stockUpdateRequest,
  stockUpdateResponse,
} from 'libs/items/src/services/stocks'
import { StockSWRKeys } from '../keys'
import { reconcileInventory } from './service'

export function useReconcileInventory() {
  const { authHeaders } = useAuth()

  return useSWRMutation<stockUpdateResponse, Error, typeof StockSWRKeys.RECONCILE, stockUpdateRequest>(
    StockSWRKeys.RECONCILE,
    (_key, { arg }) => reconcileInventory(arg, authHeaders)
  )
}
