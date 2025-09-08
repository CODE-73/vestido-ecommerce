import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  deleteItem,
  getItemDetails,
  reconcileInventory,
  updateItem,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const item = await getItemDetails(params.item_id);

    return { item };
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params: { item_id } }) => {
    const body = await request.json();
    const updated_item = await updateItem(item_id, body);

    // TODO: Rethinink about this approach
    const updated_stock_balance = await reconcileInventory({
      ...body,
      itemId: item_id,
    });

    return { updated_item, updated_stock_balance };
  },
);

export const DELETE = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    await deleteItem(params.item_id);
    return params.item_id;
  },
);
