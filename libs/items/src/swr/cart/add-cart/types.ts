import { CartItem } from '@prisma/client';

export type AddCartRequest = Omit<CartItem, 'id' | 'customerId'>;

export type AddCartResponse = {
  data: CartItem;
};
