import { CartItem, Item } from '@prisma/client';

export type CartItemResult = Array<
  CartItem & {
    item: Item;
  }
>;
