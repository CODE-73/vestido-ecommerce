import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { reconcileStock } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params: { item_id, variant_id } }) => {
    const body = await request.json();

    const data = await reconcileStock({
      ...body,
      itemId: item_id,
      itemVariantId: variant_id,
    });

    return data;
  },
);
