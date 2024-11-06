import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CouponSWRKeys } from '../keys';
import { getCouponByCode } from './service';
import { GetCouponByCodeResponse } from './types';

export function useCouponCode(couponCode?: string | null) {
  const { authHeaders } = useAuth();
  const key = couponCode
    ? [CouponSWRKeys.COUPON, CouponSWRKeys.DETAILS, couponCode]
    : null;

  return useSWRImmutable<GetCouponByCodeResponse, Error>(
    key,
    () => getCouponByCode(couponCode as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
