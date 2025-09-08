import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  createVariant,
  getStockBalances,
  listVariants,
  reconcileStock,
} from '@vestido-ecommerce/items';
import { getPrismaClient } from '@vestido-ecommerce/models';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const prisma = getPrismaClient();
    const variants = await listVariants(params.item_id);

    // TODO: Revisit
    const stockBalance = await getStockBalances(prisma, [
      { itemId: params.item_id, itemVariantId: params.variant_id },
    ]);
    return { variants, stockBalance };
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

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();
    return await reconcileStock({
      ...body,
      itemId: params.item_id,
      itemVariantId: params.variant_id,
    });
  },
);
