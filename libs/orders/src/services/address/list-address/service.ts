import { getPrismaClient } from '@vestido-ecommerce/models';

export async function listAddress(customerId: string) {
  const prisma = getPrismaClient();

  // validate zod here
  const addressList = await prisma.customerAddress.findMany({
    where: {
      customerId: customerId,
    },
  });
  // pass to prisma next

  return addressList;
}
