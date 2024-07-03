import useSWRMutation from 'swr/mutation';
import {
  RemoveFromCartRequest,
  RemoveFromCartResponse,
} from '../../../services/cart/remove-from-cart/types';
import { useAuth } from '@vestido-ecommerce/auth';
import { removeCartItem } from './service';
import { CartSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export const useRemoveFromCart = () => {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART];

  return useSWRMutation<
    RemoveFromCartResponse,
    Error,
    string[] | null,
    RemoveFromCartRequest
  >(key, (_, { arg }) => removeCartItem({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(CartSWRKeys.CART),
  });
};
