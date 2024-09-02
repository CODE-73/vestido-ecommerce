import { CartItem } from '@prisma/client';

export type AddCartRequest = Omit<
  CartItem,
  'id' | 'customerId' | 'createdAt' | 'updatedAt'
>;

export type AddCartResponse = {
  data: CartItem;
};
