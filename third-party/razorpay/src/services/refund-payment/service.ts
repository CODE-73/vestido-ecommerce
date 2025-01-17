import Razorpay from 'razorpay';

import { RefundRazorpaySchema, RefundRazorpaySchemaType } from './zod';

export async function refundRazorpay(data: RefundRazorpaySchemaType) {
  const razorpay = new Razorpay({
    key_id: process.env['NEXT_PUBLIC_RAZORPAY_KEY_ID'] as string,
    key_secret: process.env['RAZORPAY_KEY_SECRET'] as string,
  });
  const validatedData = RefundRazorpaySchema.parse(data);

  const response = razorpay.payments.refund(validatedData.paymentId, {
    amount: validatedData.amount,

    speed: 'normal',

    receipt: validatedData.receipt,
  });

  return response;
}
