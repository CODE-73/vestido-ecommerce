import { CreateRPPaymentSchemaType } from './zod';

export type CreatePaymentRequest = {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  paymentId: string;
};

export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayFailedPaymentResponse = {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
};

export type CreateRPPaymentRequest = CreateRPPaymentSchemaType;
