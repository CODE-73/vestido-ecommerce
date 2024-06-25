import { z } from 'zod';

export const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  price: z.coerce.number(),
  qty: z.number().int(),
});

export const CreateOrderSchema = z.object({
  dateTime: z.string().datetime(),
  totalPrice: z.coerce.number(),
  itemsCount: z.number().int(),
  addressId: z.string().uuid(),
  customerId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
});

export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;
