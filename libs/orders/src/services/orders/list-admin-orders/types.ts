import { Order } from '@prisma/client';

import { listAdminOrdersType } from './zod';

export type ListAdminOrderResponse = {
  data: Order[];
};

export type ListAdminOrderRequest = listAdminOrdersType;
