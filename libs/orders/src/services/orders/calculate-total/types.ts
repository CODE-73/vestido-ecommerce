import { OrderItemSchema } from '../create-order/zod';
import { calculateTotal } from './service';
import { CalculateTotalSchemaType } from './zod';

export type CalculateTotalArgs = CalculateTotalSchemaType;

export type OrderItemWithTax = typeof OrderItemSchema & {
  taxAmount: number;
};

export type CalculateTotalResult = Awaited<ReturnType<typeof calculateTotal>>;
