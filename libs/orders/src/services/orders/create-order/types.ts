import { Order, OrderItem } from '@prisma/client';
import { CreateOrderSchemaType } from './zod';

export type CreateOrderRequest = {
  data: CreateOrderSchemaType;
};
export type CreateOrderResponse = {
  data: Order & {
    orderItems: OrderItem[];
  };
};
