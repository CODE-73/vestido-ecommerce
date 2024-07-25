import { UpdateAddressRequest } from './types';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { UpdateAddressSchema } from './zod';

export async function updateAddress(
  addressId: string,
  data: UpdateAddressRequest,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateAddressSchema.parse(data);
  if (validatedData.default) {
    // Update all existing addresses to set default to false
    await prisma.customerAddress.updateMany({
      where: {
        customerId: validatedData.customerId,
        default: true,
      },
      data: {
        default: false,
      },
    });
  }

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
