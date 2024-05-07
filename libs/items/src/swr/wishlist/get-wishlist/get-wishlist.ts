import useSWRImmutable from 'swr/immutable';
import { getWishlist } from './service';
import { useAuth } from '@vestido-ecommerce/auth';
import { WishlistSWRKeys } from '../keys';
import { WishlistResponse } from './types';

export async function useWishlist(query?: string) {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST, query];

  return useSWRImmutable<WishlistResponse, Error>(
    key,
    () => getWishlist(authHeaders),
    {
      keepPreviousData: true,
    }
  );
}
