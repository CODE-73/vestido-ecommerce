import { PrismaClient } from '@prisma/client';

export async function listAddress(customerId: string) {
  const prisma = new PrismaClient();

  // validate zod here
  const addressList = await prisma.customerAddress.findMany({
    where: {
      customerId: customerId,
    },
  });
  // pass to prisma next

  return addressList;
}
