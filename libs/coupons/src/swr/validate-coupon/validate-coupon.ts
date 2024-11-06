import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CouponSWRKeys } from '../keys';
import { validateCoupon } from './service';
import { ValidateCouponResponse } from './types';

export function useValidateCoupon(coupon?: string | null) {
  const { authHeaders } = useAuth();
  const key = coupon
    ? [CouponSWRKeys.COUPON, CouponSWRKeys.DETAILS, coupon]
    : null;

  return useSWRImmutable<ValidateCouponResponse, Error>(
    key,
    () => validateCoupon(coupon as string, authHeaders),
    {
      keepPreviousData: true,
    },
  );
}
