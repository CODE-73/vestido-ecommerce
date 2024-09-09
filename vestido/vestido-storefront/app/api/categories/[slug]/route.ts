import { categoryDetails } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const category = await categoryDetails(params.slug);
  return category;
});
