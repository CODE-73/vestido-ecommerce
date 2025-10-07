import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { CartSWRKeys } from '../keys';
import { getCartItems } from './service';
import { GetCartResponse } from './types';

export function useCart() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [CartSWRKeys.CART] : null;

  return useSWRImmutable<GetCartResponse, Error>(key, () =>
    getCartItems(authHeaders),
  );
}
