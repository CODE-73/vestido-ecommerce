import { OrderItemSchema } from '../create-order/zod';
import { CalculateTotalSchemaType } from './zod';

export type CalculateTotalArgs = CalculateTotalSchemaType;

export type OrderItemWithTax = typeof OrderItemSchema & {
  taxAmount: number;
};

export type CalculateTotalResult = {
  shippingCharges: number;
  itemsPrice: number;
  totalTax: number;
  itemsWithTax: OrderItemWithTax[];
};
