import { getItemDetails } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ params }) => {
  const item = await getItemDetails(params.slug);
  item.variants = item.variants.filter((x) => x.enabled);
  return item;
});
