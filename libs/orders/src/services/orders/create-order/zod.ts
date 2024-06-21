import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const OrderItemSchema = z.object({
  price: z.coerce.number(),
  qty: z.number().int(),
  orderId: z.string().uuid(),
});

export const CreateOrderSchema = z.object({
  dateTime: z.string().datetime(),
  totalPrice: z.coerce.number(),
  itemsCount: z.number().int(),
  orderStatus: z
    .nativeEnum(OrderStatus)
    .default('PENDING' satisfies OrderStatus),
  shippingAddress: z.string().uuid(),
  customerId: z.string().uuid(),
  orderItems: z.array(OrderItemSchema),
});

export type CreateOrderSchemaType = z.infer<typeof CreateOrderSchema>;
