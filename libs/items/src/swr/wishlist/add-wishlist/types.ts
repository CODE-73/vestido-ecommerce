import { WishlistItem } from '@prisma/client';

export type AddToWishListRequest = Omit<
  WishlistItem,
  'id' | 'customerId' | 'variantId' | 'createdAt' | 'updatedAt'
>;

export type AddToWishListResponse = {
  data: WishlistItem;
};
