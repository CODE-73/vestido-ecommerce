import { verifyRPSignSchemaType } from './zod';

export type verifySignatureRequest = {
  data: verifyRPSignSchemaType;
};

export type verifySignatureResponse = {
  data: string;
};
