import { CartItem } from '@prisma/client';

export type AddToCartRequest = {
  data: Partial<CartItem>;
};

export type AddToCartResponse = {
  data: CartItem;
};
