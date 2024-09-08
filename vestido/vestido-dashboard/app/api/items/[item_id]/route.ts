import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  deleteItem,
  getItemDetails,
  updateItem,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const item = await getItemDetails(params.item_id);
    return item;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params: { item_id } }) => {
    const body = await request.json();
    return await updateItem(item_id, body);
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
