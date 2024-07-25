import { WishlistItem } from '@prisma/client';

export type AddToWishListRequest = Omit<
  WishlistItem,
  'id' | 'customerId' | 'variantId'
>;

export type AddToWishListResponse = {
  data: WishlistItem;
};
