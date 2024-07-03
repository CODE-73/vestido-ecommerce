import { getPrismaClient } from '@vestido-ecommerce/models';
import { ListCategoryRequest } from './types';
import { ListCategoryRequestSchema } from './zod';

export async function listCategories(_args: ListCategoryRequest) {
  const prisma = getPrismaClient();
  const args = ListCategoryRequestSchema.parse(_args);

  const categoriesList = await prisma.category.findMany({
    ...(args?.q
      ? {
          where: {
            OR: [{ name: { contains: args.q, mode: 'insensitive' } }],
          },
        }
      : {}),
  });

  return categoriesList;
}
