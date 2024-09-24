import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { UpdateCouponArgs } from '../../services';
import { UpdateCouponSWRKeys } from '../keys';
import { updateCoupon } from './service';
import { UpdateCouponResponse } from './types';

export const useUpdateCoupon = () => {
  const { authHeaders } = useAuth();
  const key = [UpdateCouponSWRKeys.UPDATE, UpdateCouponSWRKeys.COUPON];

  return useSWRMutation<
    UpdateCouponResponse,
    Error,
    string[] | null,
    UpdateCouponArgs
  >(key, (_, { arg }) => updateCoupon({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(UpdateCouponSWRKeys.COUPON),
  });
};
