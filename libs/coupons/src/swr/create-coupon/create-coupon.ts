import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CreateCouponArgs } from '../../services';
import { CouponSWRKeys } from '../keys';
import { createCoupon } from './service';
import { CreateCouponResponse } from './types';

export const useCreateCoupon = () => {
  const { authHeaders } = useAuth();
  const key = [CouponSWRKeys.CREATE, CouponSWRKeys.COUPON];

  return useSWRMutation<
    CreateCouponResponse,
    Error,
    string[] | null,
    CreateCouponArgs
  >(key, (_, { arg }) => createCoupon({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CouponSWRKeys.COUPON),
  });
};
