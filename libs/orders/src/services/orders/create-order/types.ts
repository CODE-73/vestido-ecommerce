import { Order, OrderItem, Payment } from '@prisma/client';

import { VestidoResponse } from '@vestido-ecommerce/utils';

import { CreateOrderSchemaType } from './zod';

export type CreateOrderRequest = Omit<CreateOrderSchemaType, 'customerId'>;
export type CreateOrderResponse = {
  order: Order & {
    orderItems: OrderItem[];
  };
  payment: Payment | null;
};

export type CreateOrderSWRResponse = VestidoResponse<CreateOrderResponse>;
