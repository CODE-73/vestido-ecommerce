import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { UpdateCouponArgs } from '../../services';
import { CouponSWRKeys } from '../keys';
import { updateCoupon } from './service';
import { UpdateCouponResponse } from './types';

export const useUpdateCoupon = () => {
  const { authHeaders } = useAuth();
  const key = [CouponSWRKeys.UPDATE, CouponSWRKeys.COUPON];

  return useSWRMutation<
    UpdateCouponResponse,
    Error,
    string[] | null,
    UpdateCouponArgs
  >(key, (_, { arg }) => updateCoupon({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CouponSWRKeys.COUPON),
  });
};
