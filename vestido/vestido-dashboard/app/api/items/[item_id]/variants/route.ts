import { authMiddleware } from '@vestido-ecommerce/auth';
import { createVariant, listVariants } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const variants = await listVariants(params.item_id);
  return variants;
});

export const POST = apiRouteHandler(authMiddleware, async ({ request }) => {
  const body = await request.json();
  const newVariant = await createVariant(body);
  return newVariant;
});
