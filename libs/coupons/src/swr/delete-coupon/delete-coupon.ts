import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CouponSWRKeys } from '../keys';
import { deleteCoupon } from './service';
import { DeleteCouponRequest, DeleteCouponResponse } from './types';

export function useCouponDelete() {
  const { authHeaders } = useAuth();
  const key = [CouponSWRKeys.COUPON, CouponSWRKeys.DELETE, 'deletion'];

  return useSWRMutation<
    DeleteCouponResponse,
    Error,
    string[] | null,
    Pick<DeleteCouponRequest, 'couponId'>
  >(key, (_, { arg }) => deleteCoupon({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CouponSWRKeys.COUPON),
  });
}
