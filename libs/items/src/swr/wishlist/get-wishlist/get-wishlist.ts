import useSWRImmutable from 'swr/immutable';
import { getWishlist } from './service';
import { useAuth } from '@vestido-ecommerce/auth';
import { WishlistSWRKeys } from '../keys';
import { wishlistItemsResponse } from '@vestido-ecommerce/items';

export async function useWishlist(query?: string) {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST, query];

  return useSWRImmutable<wishlistItemsResponse, Error>(
    key,
    () => getWishlist(authHeaders),
    {
      keepPreviousData: true,
    }
  );
}
