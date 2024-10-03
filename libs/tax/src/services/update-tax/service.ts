import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateTaxSchema, UpdateTaxSchemaType } from './zod';

export async function updateTax(taxId: string, data: UpdateTaxSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = UpdateTaxSchema.parse(data);

  const updatedTax = await prisma.tax.update({
    where: {
      id: taxId,
    },
    data: {
      title: validatedData.title,
      description: validatedData.description,
      rate: validatedData.rate,
      active: validatedData.active,
    },
  });
  return updatedTax;
}
