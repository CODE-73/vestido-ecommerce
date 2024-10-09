import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteTax(taxId: string) {
  const prisma = getPrismaClient();

  await prisma.tax.delete({
    where: {
      id: taxId,
    },
  });

  return true;
}
