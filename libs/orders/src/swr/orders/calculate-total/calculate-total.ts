import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CalculateTotalArgs } from '../../../services/orders/calculate-total';
import { CalculateTotalSWRKeys } from '../keys';
import { calculateTotal } from './service';

export const useCalculateTotal = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated
    ? [CalculateTotalSWRKeys.CALCULATE, CalculateTotalSWRKeys.ORDER]
    : null;

  return useSWRMutation<string, Error, string[] | null, CalculateTotalArgs>(
    key,
    (_, { arg }) => calculateTotal({ ...arg }, authHeaders),
    {
      ...useClearCacheOnSuccess(CalculateTotalSWRKeys.ORDER),
    },
  );
};
