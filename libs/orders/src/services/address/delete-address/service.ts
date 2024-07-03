import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteAddress(addressId: string) {
  const prisma = getPrismaClient();

  const deletedAddress = await prisma.customerAddress.delete({
    where: {
      id: addressId,
    },
  });
  return deletedAddress;
}
