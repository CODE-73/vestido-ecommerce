import { z } from 'zod';
const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

// Define the schema for each order item
const ReturnItemSchema = z.object({
  name: z.string(),
  sku: z.unknown(),
  units: z.number().positive(),
  selling_price: z.number().positive(),
  discount: z.number().nullable(),
  tax: z.number().nullable(),
  hsn: z.string().nullable(),
});

export const ShiprocketReturnOrderSchema = z.object({
  order_id: z.string().uuid(),
  order_date: z.date(),
  pickup_customer_name: z.string(),
  pickup_last_name: z.string(),
  pickup_email: z.string().email(),
  pickup_phone: z.string(),
  pickup_address: z.string(),
  pickup_address_2: z.string(),
  pickup_city: z.string(),
  pickup_pincode: z
    .string()
    .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
  pickup_state: z.string(),
  payment_method: z.string(),
  return_items: z.array(ReturnItemSchema),
  refund_amount: z.number(),
  length: z.number(),
  breadth: z.number(),
  height: z.number(),
  weight: z.number(),
  total_discount: z.number().nullable(),
});

export type ShiprocketReturnOrderSchemaType = z.infer<
  typeof ShiprocketReturnOrderSchema
>;
