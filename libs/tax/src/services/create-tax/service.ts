import { getPrismaClient } from '@vestido-ecommerce/models';

import { CreateTaxSchema, CreateTaxSchemaType } from './zod';

export async function createTax(data: CreateTaxSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateTaxSchema.parse(data);

  const newTax = await prisma.tax.create({
    data: { ...validatedData },
  });
  return newTax;
}
