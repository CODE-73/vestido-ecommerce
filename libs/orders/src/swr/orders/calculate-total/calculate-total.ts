import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { OrderSWRKeys } from '../keys';
import { calculateTotal } from './service';
import { CalculateTotalRequest, CalculateTotalResponse } from './types';

export function useCalculateTotal(args: CalculateTotalRequest) {
  const { isAuthenticated, authHeaders } = useAuth();
  const key =
    isAuthenticated && args.addressId && args.orderItems && args.paymentType
      ? [
          OrderSWRKeys.CALCULATE,
          OrderSWRKeys.ORDER,
          args.addressId,
          args.orderItems,
          args.paymentType,
          args.couponCode,
        ]
      : null;

  return useSWRImmutable<CalculateTotalResponse, Error>(key, () =>
    calculateTotal(args, authHeaders),
  );
}
