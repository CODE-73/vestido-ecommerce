import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { ListCouponArgs } from '../../services';
import { ListCouponSWRKeys } from '../keys';
import { getCouponsList } from './service';
import { ListCouponResponse } from './types';

export function useCoupons(args?: ListCouponArgs) {
  const { authHeaders } = useAuth();
  const key = [
    ListCouponSWRKeys.COUPON,
    ListCouponSWRKeys.LIST,
    JSON.stringify(args ?? {}),
  ];

  return useSWRImmutable<ListCouponResponse, Error>(
    key,
    () =>
      getCouponsList(
        {
          ...(args ?? {}),
        },
        authHeaders,
      ),
    {
      keepPreviousData: true,
    },
  );
}
