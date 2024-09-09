import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  deleteVariant,
  updateVariant,
  variantDetails,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const variant = await variantDetails(params.variant_id);
    return variant;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();
    const r = await updateVariant(params.variant_id, body);
    return r;
  },
);

export const DELETE = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    await deleteVariant(params.variant_id);
    return params.variant_id;
  },
);
