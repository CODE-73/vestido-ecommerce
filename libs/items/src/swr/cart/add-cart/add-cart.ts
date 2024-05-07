import useSWRMutation from 'swr/mutation';
import { AddToCartRequest, AddToCartResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { addToCart } from './service';
import { CartSWRKeys } from '../keys';

export const useAddToCart = () => {
  const { authHeaders } = useAuth();
  const key = [CartSWRKeys.CART];

  return useSWRMutation<
    AddToCartResponse,
    Error,
    string[] | null,
    AddToCartRequest
  >(key, (_, { arg }) => addToCart({ ...arg }, authHeaders));
};
