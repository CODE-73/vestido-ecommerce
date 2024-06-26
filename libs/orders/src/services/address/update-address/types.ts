import { UpdateAddressSchemaType } from './zod';
import { CustomerAddress } from '@prisma/client';

export type UpdateAddressRequest = UpdateAddressSchemaType;
export type UpdateAddressResponse = {
  data: CustomerAddress;
};
