import { z } from 'zod';

export const CancelOrderSchema = z.object({
  orderId: z.string(),
  reason: z.enum([
    'ORDER_CREATED_BY_MISTAKE',
    'ITEM_PRICE_TOO_HIGH',
    'NEED_TO_CHANGE_SHIPPING_ADDRESS',
    'NEED_TO_CHANGE_PAYMENT_METHOD',
    'OTHER',
  ]),
  remarks: z.string(),
});

export type CancelOrderSchemaType = z.infer<typeof CancelOrderSchema>;
