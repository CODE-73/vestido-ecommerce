import useSWRMutation from 'swr/mutation';
import { AddCartRequest, AddCartResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { addCartItem } from './service';
import { CartSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export const useAddToCart = () => {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART];

  return useSWRMutation<
    AddCartResponse,
    Error,
    string[] | null,
    AddCartRequest
  >(key, (_, { arg }) => addCartItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CartSWRKeys.CART),
  });
};
