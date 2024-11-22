import { listVariants } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const variants = await listVariants(params.item_id);
  return variants;
});
