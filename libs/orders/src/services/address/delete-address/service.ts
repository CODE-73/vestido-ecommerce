import { Prisma } from '@prisma/client';

import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteAddress(addressId: string) {
  const prisma = getPrismaClient();
  let deletedAddress = null;

  try {
    // Attempt to delete the address
    deletedAddress = await prisma.customerAddress.delete({
      where: {
        id: addressId,
      },
    });
  } catch (error) {
    // Check if the error is an instance of Prisma's `Prisma.PrismaClientKnownRequestError`
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma-specific errors, such as foreign key constraint violations
      if (error.code === 'P2003') {
        // Prisma-specific error code for foreign key constraint violation
        // Mark the address as archived instead
        deletedAddress = await prisma.customerAddress.update({
          where: {
            id: addressId,
          },
          data: {
            archived: true,
          },
        });
      } else {
        // Re-throw other Prisma errors
        throw error;
      }
    } else {
      // Re-throw non-Prisma errors
      throw error;
    }
  }

  return deletedAddress;
}
