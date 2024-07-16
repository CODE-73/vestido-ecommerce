import useSWRMutation from 'swr/mutation';
import { RemoveFromWishListRequest, RemoveFromWishListResponse } from './types';
import { useAuth } from '@vestido-ecommerce/auth';
import { removeFromWishList } from './service';
import { WishlistSWRKeys } from '../keys';
import { useClearCacheOnSuccess } from '@vestido-ecommerce/utils';

export const useRemoveFromWishlist = () => {
  const { authHeaders } = useAuth();
  const key = [WishlistSWRKeys.WISHLIST];

  return useSWRMutation<
    RemoveFromWishListResponse,
    Error,
    string[] | null,
    RemoveFromWishListRequest
  >(key, (_, { arg }) => removeFromWishList({ ...arg }, authHeaders), {
    ...useClearCacheOnSuccess(WishlistSWRKeys.WISHLIST),
  });
};
