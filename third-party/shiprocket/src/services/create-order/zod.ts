import { z } from 'zod';
const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

// Define the schema for each order item
const OrderItemSchema = z.object({
  name: z.string(),
  sku: z.unknown(),
  units: z.number().positive(),
  selling_price: z.number().positive(),
  discount: z.number().nullable(),
  tax: z.string().nullable(),
  hsn: z.string().nullable(),
});

export const CreateShiprocketSchema = z.object({
  fulfillmentId: z.string().uuid(),
  orderDate: z.date(),
  pickupLocation: z.string(),
  shippingIsBilling: z.boolean(),
  billing_customer_name: z.string(),
  billing_last_name: z.string(),
  billing_email: z.string().email(),
  billing_phone: z.string(),
  billing_address: z.string(),
  billing_address_2: z.string(),
  billing_city: z.string(),
  billing_pincode: z
    .string()
    .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
  billing_state: z.string(),
  paymentMethod: z.string(),
  order_items: z.array(OrderItemSchema),
  totalAmount: z.number(),
  length: z.number(),
  breadth: z.number(),
  height: z.number(),
  weight: z.number(),
});

export type CreateShiprocketSchemaType = z.infer<typeof CreateShiprocketSchema>;
