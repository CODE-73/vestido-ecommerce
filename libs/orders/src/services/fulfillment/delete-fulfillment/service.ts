import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function deleteFulfillment(fulfillmentId: string) {
  const prisma = getPrismaClient();

  const existingFulfillment = await prisma.fulfillment.findUnique({
    where: {
      id: fulfillmentId,
    },
    select: {
      status: true,
    },
  });

  if (existingFulfillment?.status === 'DRAFT') {
    const result = await prisma.$transaction(async (prisma) => {
      // Delete associated FulfillmentItems
      await prisma.fulfillmentItem.deleteMany({
        where: {
          fulfillmentId: fulfillmentId,
        },
      });

      // Delete the Fulfillment
      const deletedFulfillment = await prisma.fulfillment.delete({
        where: {
          id: fulfillmentId,
        },
        include: {
          fulfillmentItems: true, // Include the related fulfillment items
        },
      });

      return deletedFulfillment;
    });

    return result;
  } else {
    throw new VestidoError({
      name: 'FulfillmentDeletionFailed',
      message:
        'Fulfillment cannot be deleted as it is already submitted. It can only be cancelled',
      httpStatus: 400,
      context: {
        fulfillmentId: fulfillmentId,
        fulfillmentStatus: existingFulfillment?.status,
      },
    });
  }
}
