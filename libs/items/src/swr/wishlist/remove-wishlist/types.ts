import { RemoveFromWishlistRequest } from '../../../services/wishlist/remove-from-wishlist/types';

export type RemoveFromWishListSwrRequest = Omit<
  RemoveFromWishlistRequest,
  'customerId'
>;
