import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  attributeDetails,
  deleteAttribute,
  updateAttribute,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const attribute = await attributeDetails(params.slug);
    return attribute;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const data = await request.json();
    const r = await updateAttribute(params.slug, data);
    return r;
  },
);

export const DELETE = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const deletedAttribute = await deleteAttribute(params.slug);
    return deletedAttribute;
  },
);
