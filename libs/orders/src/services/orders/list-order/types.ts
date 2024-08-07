import { Item, Order, OrderItem } from '@prisma/client';

export type ListOrderResponse = {
  data: Array<
    Order & {
      orderItems: Array<
        OrderItem & {
          item: Item;
        }
      >;
    }
  >;
};
