import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { GetCouponSWRKeys } from '../keys';
import { getCoupon } from './service';
import { GetCouponResponse } from './types';

export function useCoupon(couponId?: string | null) {
  const { authHeaders } = useAuth();
  const key = couponId
    ? [GetCouponSWRKeys.COUPON, GetCouponSWRKeys.DETAILS, couponId]
    : null;

  return useSWRImmutable<GetCouponResponse, Error>(
    key,
    () => getCoupon(couponId as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
