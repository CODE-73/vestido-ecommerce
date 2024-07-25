import { CustomerAddress } from '@prisma/client';

import { UpdateAddressSchemaType } from './zod';

export type UpdateAddressRequest = UpdateAddressSchemaType;
export type UpdateAddressResponse = {
  data: CustomerAddress;
};
