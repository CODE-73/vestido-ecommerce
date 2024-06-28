import { CustomerAddress } from '@prisma/client';

export type AddressUpsertRequest = Omit<
  CustomerAddress,
  'id' | 'customerId'
> & {
  id: string | null;
};

export type AddressUpsertResponse = {
  data: CustomerAddress;
};
