import { getAttribute } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const attribute = await getAttribute(params.slug);
  return attribute;
});
