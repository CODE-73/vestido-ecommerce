import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CartSWRKeys } from '../keys';
import { addCartItem } from './service';
import { AddCartRequest, AddCartResponse } from './types';

export const useAddToCart = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [CartSWRKeys.CART] : null;

  return useSWRMutation<
    AddCartResponse,
    Error,
    string[] | null,
    AddCartRequest
  >(key, (_, { arg }) => addCartItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CartSWRKeys.CART),
  });
};
