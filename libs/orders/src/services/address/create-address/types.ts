import { CustomerAddress } from '@prisma/client';

import { CreateAddressSchemaType } from './zod';

export type CreateAddressRequest = {
  data: CreateAddressSchemaType;
};
export type CreateAddressResponse = {
  data: CustomerAddress;
};
