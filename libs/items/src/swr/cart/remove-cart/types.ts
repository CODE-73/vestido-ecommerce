import { CartItem } from '@prisma/client';

export type RemoveFromCartRequest = {
  data: Partial<CartItem>;
};

export type RemoveFromCartResponse = {
  data: CartItem;
};
