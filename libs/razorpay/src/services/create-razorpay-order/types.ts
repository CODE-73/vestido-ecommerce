import { CreateRPOrderSchemaType } from './zod';

export type CreateRPOrderRequest = {
  data: CreateRPOrderSchemaType;
};

export type CreateOrderResponse = {
  data: string;
};
