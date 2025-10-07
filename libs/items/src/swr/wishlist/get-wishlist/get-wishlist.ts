import useSWRImmutable from 'swr/immutable';

import { useAuth } from '@vestido-ecommerce/auth/client';

import { WishlistSWRKeys } from '../keys';
import { getWishlist } from './service';
import { WishlistItemResponse } from './types';

export function useWishlist() {
  const { isAuthenticated, authHeaders } = useAuth();
  const key = isAuthenticated ? [WishlistSWRKeys.WISHLIST] : null;

  return useSWRImmutable<WishlistItemResponse, Error>(key, () =>
    getWishlist(authHeaders),
  );
}
