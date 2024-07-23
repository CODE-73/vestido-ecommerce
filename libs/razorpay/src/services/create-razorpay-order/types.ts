import { CreateRPOrderSchemaType } from './zod';

export type CreateRPOrderRequest = {
  razorpayData: CreateRPOrderSchemaType;
};

export type CreateRPOrderResponse = {
  data: string;
};
