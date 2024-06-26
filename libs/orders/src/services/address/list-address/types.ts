import { CustomerAddress } from '@prisma/client';

export type ListAddressResponse = {
  data: CustomerAddress[];
};
