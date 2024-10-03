import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListTaxArgs } from './types';
import { ListTaxSchema } from './zod';

export async function listTax(data: ListTaxArgs) {
  const prisma = getPrismaClient();
  const args = ListTaxSchema.parse(data ?? {});

  const taxList = await prisma.tax.findMany({
    ...(args?.q
      ? {
          where: {
            OR: [{ title: { contains: args.q, mode: 'insensitive' } }],
          },
        }
      : {}),
  });
  return taxList;
}
