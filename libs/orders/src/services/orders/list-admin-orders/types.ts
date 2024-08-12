import { Order } from '@prisma/client';

export type ListAdminOrderResponse = {
  data: Order[];
};
