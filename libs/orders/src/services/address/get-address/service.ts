import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getAddress(addressId: string) {
  const prisma = getPrismaClient();

  const address = await prisma.customerAddress.findUnique({
    where: {
      id: addressId,
    },
  });
  // no try..catch here

  return address;
}
