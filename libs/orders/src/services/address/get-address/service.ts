import { PrismaClient } from '@prisma/client';

export async function getAddress(addressId: string) {
  const prisma = new PrismaClient();

  const address = await prisma.customerAddress.findUnique({
    where: {
      id: addressId,
    },
  });
  // no try..catch here

  return address;
}
