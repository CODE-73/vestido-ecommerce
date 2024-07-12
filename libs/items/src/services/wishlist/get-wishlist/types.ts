import { WishlistItem, Item } from '@prisma/client';

export type WishlistItemResponse = {
  data: Array<
    WishlistItem & {
      item: Item;
    }
  >;
};
