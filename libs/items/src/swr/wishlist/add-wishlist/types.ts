import { WishlistItem } from '@prisma/client';

export type AddToWishListRequest = Omit<WishlistItem, 'id' | 'customerId'>;

export type AddToWishListResponse = {
  data: WishlistItem;
};
