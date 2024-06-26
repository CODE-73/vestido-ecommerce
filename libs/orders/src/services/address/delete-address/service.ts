import { PrismaClient } from '@prisma/client';

export async function deleteAddress(addressId: string) {
  const prisma = new PrismaClient();

  const deletedAddress = await prisma.customerAddress.delete({
    where: {
      id: addressId,
    },
  });
  return deletedAddress;
}
