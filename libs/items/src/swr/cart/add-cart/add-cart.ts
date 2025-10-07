import useSWRMutation from 'swr/mutation';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { CartSWRKeys } from '../keys';
import { addCartItem } from './service';
import { AddToCartRequest, AddToCartResponse } from './types';

export const useAddToCart = () => {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [CartSWRKeys.CART] : null;

  return useSWRMutation<
    AddToCartResponse,
    Error,
    string[] | null,
    AddToCartRequest
  >(key, (_, { arg }) => addCartItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CartSWRKeys.CART, false),
  });
};
