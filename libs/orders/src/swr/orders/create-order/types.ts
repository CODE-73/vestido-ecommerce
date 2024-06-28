import { Order } from '@prisma/client';

export type CreateOrderRequest = Order;

export type CreateOrderResponse = {
  data: Order;
};
