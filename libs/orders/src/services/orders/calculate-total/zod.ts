import { z } from 'zod';

import { OrderItemSchema } from '../create-order/zod';

export const calculateTotalSchema = z.object({
  addressId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
  couponCode: z.string(),
});

export type calculateTotalSchemaType = z.infer<typeof calculateTotalSchema>;
