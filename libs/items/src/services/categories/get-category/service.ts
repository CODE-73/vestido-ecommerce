import { Category } from '@prisma/client';
import { validate as uuidValidate } from 'uuid';

import { getPrismaClient } from '@vestido-ecommerce/models';
import { slugify } from '@vestido-ecommerce/utils';

export async function categoryDetails(categoryId: string) {
  const prisma = getPrismaClient();
  if (uuidValidate(categoryId)) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  } else {
    categoryId = slugify(categoryId);

    return (await prisma.$queryRaw`
      SELECT * FROM "Category"
      WHERE "slug" = ${categoryId}
      OR ${categoryId} IN (SELECT UNNEST(slugify_array("searchTerms")))
      LIMIT 1
    `) as unknown as Category | null;
  }
}
