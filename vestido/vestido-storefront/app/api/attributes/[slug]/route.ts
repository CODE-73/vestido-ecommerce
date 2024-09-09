import { attributeDetails } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const attribute = await attributeDetails(params.slug);
  return attribute;
});
