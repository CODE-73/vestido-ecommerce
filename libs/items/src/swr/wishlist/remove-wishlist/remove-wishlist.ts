import useSWRMutation from 'swr/mutation';
import { RemoveFromWishlistRequest, RemoveFromWishlistResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { removeFromWishlist } from './service';
import { WishlistSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export const useRemoveFromWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    RemoveFromWishlistResponse,
    Error,
    string[] | null,
    RemoveFromWishlistRequest
  >(key, (_, { arg }) => removeFromWishlist({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
