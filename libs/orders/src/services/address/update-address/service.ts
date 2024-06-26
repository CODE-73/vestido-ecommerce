import { UpdateAddressRequest } from './types';
import { PrismaClient } from '@prisma/client';
import { UpdateAddressSchema } from './zod';

export async function updateAddress(
  addressId: string,
  data: UpdateAddressRequest
) {
  const prisma = new PrismaClient();

  const validatedData = UpdateAddressSchema.parse(data);

  const updatedAddress = await prisma.customerAddress.update({
    where: {
      id: addressId,
    },
    data: {
      ...validatedData,
    },
  });

  return updatedAddress;
}
