import { z } from 'zod';

export const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  price: z.coerce.number(),
  qty: z.number().int(),
  variantId: z.string().uuid().nullish(),
  taxTitle: z.string().nullish(),
  taxRate: z.coerce.number().nullish(),
  taxInclusive: z.boolean().nullish(),
});

export const CreateOrderSchema = z.object({
  addressId: z.string().uuid(),
  customerId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY']),
});

export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;
