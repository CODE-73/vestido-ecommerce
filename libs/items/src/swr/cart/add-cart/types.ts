import { CartItem } from '@prisma/client';

export type AddToCartRequest = Partial<CartItem>;

export type AddToCartResponse = {
  data: CartItem;
};
