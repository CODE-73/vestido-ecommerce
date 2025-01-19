import { z } from 'zod';

export const ReturnPackageSchema = z.object({
  length: z.number().min(0.5, { message: 'Length must be greater than 0.5' }),
  breadth: z.number().min(0.5, { message: 'Breadth must be greater than 0.5' }),
  height: z.number().min(0.5, { message: 'Height must be greater than 0.5' }),
  weight: z.number().min(0.1, { message: 'Weight must be greater than 0' }),
});

export const ReturnItemSchema = z.object({
  orderItemId: z.string().uuid(),
  quantity: z.number().int(),
  FulfillmentItemPrice: z.number().positive(),
});

const indianMobileRegex = /^[6-9]\d{9}$/;

export const ReturnOrderSchema = z.object({
  returnType: z.string(),
  fulfillmentId: z.string().uuid(),
  orderId: z.string().uuid(),
  reason: z.string(),
  returnItems: z.array(ReturnItemSchema),
});

export const BankDetailsSchema = z.object({
  customerId: z.string(),
  bankAccountNumber: z.string(),
  bankIfscCode: z.string(),
  bankAccountHolderName: z.string().optional(),
  mobile: z
    .string()
    .regex(indianMobileRegex, 'Please enter a valid Indian mobile number')
    .optional(),
});

export type ReturnOrderSchemaType = z.infer<typeof ReturnOrderSchema>;
