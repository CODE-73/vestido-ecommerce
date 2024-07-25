import { Item, WishlistItem } from '@prisma/client';

export type WishlistItemResponse = {
  data: Array<
    WishlistItem & {
      item: Item;
    }
  >;
};
