import { CartItem, Item } from '@prisma/client';

export type GetCartResult = Array<
  CartItem & {
    item: Item;
  }
>;
