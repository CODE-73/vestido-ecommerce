import { CartItem, Item } from '@prisma/client';

export type CartItemResponse = {
  data: Array<
    CartItem & {
      item: Item;
    }
  >;
};
