import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  const fulfillment = await prisma.fulfillment.findUnique({
    where: {
      id: fulfillmentId,
    },
    include: {
      fulfillmentItems: true,
    },
  });

  return fulfillment;
}
