import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CouponSWRKeys } from '../keys';
import { getCoupon } from './service';
import { GetCouponResponse } from './types';

export function useCoupon(couponId?: string | null) {
  const { authHeaders } = useAuth();
  const key = couponId
    ? [CouponSWRKeys.COUPON, CouponSWRKeys.DETAILS, couponId]
    : null;

  return useSWRImmutable<GetCouponResponse, Error>(
    key,
    () => getCoupon(couponId as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
