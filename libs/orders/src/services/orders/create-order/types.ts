import { Order } from '@prisma/client';
import { CreateOrderSchemaType } from './zod';

export type CreateOrderRequest = {
  data: CreateOrderSchemaType;
};
export type CreateOrderResponse = {
  data: Order;
};
