import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CouponSWRKeys } from '../keys';
import { upsertCoupon } from './service';
import { UpsertCouponRequest, UpsertCouponResponse } from './types';

export const useUpsertCoupon = () => {
  const { authHeaders } = useAuth();
  const key = [CouponSWRKeys.COUPON, CouponSWRKeys.UPSERT];

  return useSWRMutation<
    UpsertCouponResponse,
    Error,
    string[] | null,
    UpsertCouponRequest
  >(key, (_, { arg }) => upsertCoupon({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CouponSWRKeys.COUPON),
  });
};
