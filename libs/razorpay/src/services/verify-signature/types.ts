import { verifyRPSignSchemaType } from './zod';

export type verifyPaymentRequest = verifyRPSignSchemaType;

export type verifyPaymentResponse = {
  success: string;
  message: string;
};
