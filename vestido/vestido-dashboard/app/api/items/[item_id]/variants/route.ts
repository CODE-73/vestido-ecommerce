import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { createVariant, listVariants } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const variants = await listVariants(params.item_id);
    return variants;
  },
);

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const body = await request.json();
    const newVariant = await createVariant(body);
    return newVariant;
  },
);
