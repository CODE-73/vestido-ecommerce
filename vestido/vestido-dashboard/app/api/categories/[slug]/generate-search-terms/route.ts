import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { generateCategorySearchTerms } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const r = await generateCategorySearchTerms(params.slug);
    return r;
  },
);
