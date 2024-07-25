import useSWRMutation from 'swr/mutation';
import { RemoveFromWishListSwrRequest } from './types';
import { RemoveFromWishlistResponse } from '../../../services/wishlist/remove-from-wishlist';
import { useAuth } from '@vestido-ecommerce/auth';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

import { WishlistSWRKeys } from '../keys';
import { removeFromWishList } from './service';

export const useRemoveFromWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    RemoveFromWishlistResponse,
    Error,
    string[] | null,
    RemoveFromWishListSwrRequest
  >(key, (_, { arg }) => removeFromWishList({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
