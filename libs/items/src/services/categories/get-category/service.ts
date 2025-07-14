import { Category } from '@prisma/client';
import { validate as isUUID } from 'uuid';

import { getPrismaClient } from '@vestido-ecommerce/models';
import { slugify } from '@vestido-ecommerce/utils';

export async function categoryDetails(idOrSlug: string) {
  const prisma = getPrismaClient();
  if (isUUID(idOrSlug)) {
    const category = await prisma.category.findUnique({
      where: { id: idOrSlug },
    });

    return category;
  } else {
    idOrSlug = slugify(idOrSlug);

    const categories = (await prisma.$queryRaw`
      SELECT * FROM "Category"
      WHERE "slug" = ${idOrSlug}
      OR ${idOrSlug} IN (SELECT UNNEST(slugify_array("searchTerms")))
      LIMIT 1
    `) as unknown as Category[] | null;

    if (categories && categories.length > 0) {
      return categories[0];
    }

    return null;
  }
}
