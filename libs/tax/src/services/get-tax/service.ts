import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getTax(taxId: string) {
  const prisma = getPrismaClient();

  const taxDetails = await prisma.tax.findUnique({
    where: {
      id: taxId,
    },
  });

  return taxDetails;
}
