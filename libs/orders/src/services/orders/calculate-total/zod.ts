import { z } from 'zod';

import { OrderItemSchema } from '../create-order/zod';

export const CalculateTotalSchema = z.object({
  addressId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY', 'REPLACEMENT_ORDER']),
  couponCode: z.string().nullish(),
});

export type CalculateTotalSchemaType = z.infer<typeof CalculateTotalSchema>;
