import { z } from 'zod';

export const ReturnItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.number().int(),
});

const indianMobileRegex = /^[6-9]\d{9}$/;

export const returnOrderSchema = z.object({
  fulfillmentId: z.string().uuid(),
  orderId: z.string().uuid(),
  reason: z.string(),
  returnItems: z.array(ReturnItemSchema),
  bankAccountNumber: z.string().optional(),
  bankIfscCode: z.string().optional(),
  bankAccountHolderName: z.string().optional(),
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number')
    .optional(),
});

export type returnOrderSchemaType = z.infer<typeof returnOrderSchema>;
