import { authMiddleware } from '@vestido-ecommerce/auth';
import {
  attributeDetails,
  deleteAttribute,
  updateAttribute,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const attribute = await attributeDetails(params.slug);
  return attribute;
});

export const PUT = apiRouteHandler(
  authMiddleware,
  async ({ request, params }) => {
    const data = await request.json();
    const r = await updateAttribute(params.slug, data);
    return r;
  },
);

export const DELETE = apiRouteHandler(authMiddleware, async ({ params }) => {
  const deletedAttribute = await deleteAttribute(params.slug);
  return deletedAttribute;
});
