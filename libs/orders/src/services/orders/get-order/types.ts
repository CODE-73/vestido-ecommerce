import { Order, OrderItem } from '@prisma/client';

export type GetOrderResponse = {
  data: Order & {
    OrderItems: OrderItem[];
  };
};
