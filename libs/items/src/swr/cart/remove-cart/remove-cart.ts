import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { RemoveFromCartResponse } from '../../../services/cart/remove-from-cart/types';
import { CartSWRKeys } from '../keys';
import { removeCartItem } from './service';
import { RemoveFromCartSWRRequest } from './types';

export const useRemoveFromCart = () => {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART];

  return useSWRMutation<
    RemoveFromCartResponse,
    Error,
    string[] | null,
    RemoveFromCartSWRRequest
  >(key, (_, { arg }) => removeCartItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CartSWRKeys.CART),
  });
};
