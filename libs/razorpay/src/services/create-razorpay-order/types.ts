import { CreateRPOrderSchemaType } from './zod';

export type CreateRPOrderRequest = {
  razorpayData: CreateRPOrderSchemaType;
};

export type CreateRPOrderResponse = {
  paymentId: string;
  razorpayOrderId: string;
};
