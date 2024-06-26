import { Order } from '@prisma/client';

export type ListOrderResponse = {
  data: Order[];
};
