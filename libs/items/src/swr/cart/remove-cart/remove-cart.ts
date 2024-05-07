import useSWRMutation from 'swr/mutation';
import { RemoveFromCartRequest, RemoveFromCartResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { removeFromCart } from './service';
import { CartSWRKeys } from '../keys';

export const useRemoveFromCart = () => {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART];

  return useSWRMutation<
    RemoveFromCartResponse,
    Error,
    string[] | null,
    RemoveFromCartRequest
  >(key, (_, { arg }) => removeFromCart({ ...arg }, authHeaders));
};
