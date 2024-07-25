import { Order, OrderItem } from '@prisma/client';

import { CreateOrderSchemaType } from './zod';

export type CreateOrderRequest = Omit<CreateOrderSchemaType, 'customerId'>;
export type CreateOrderResponse = {
  data: Order & {
    orderItems: OrderItem[];
  };
};
