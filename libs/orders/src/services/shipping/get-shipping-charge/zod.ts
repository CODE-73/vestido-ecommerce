import { z } from 'zod';

export const ShippingChargesSchema = z.object({
  paymentType: z.enum(['ONLINE', 'CASH_ON_DELIVERY', 'REPLACEMENT_ORDER']),
  shippingAddressId: z.string(),
});

export type ShippingChargesSchemaType = z.infer<typeof ShippingChargesSchema>;
