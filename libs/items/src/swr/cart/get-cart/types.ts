import { CartItem } from '@prisma/client';

export type CartResponse = {
  data: CartItem[];
};
