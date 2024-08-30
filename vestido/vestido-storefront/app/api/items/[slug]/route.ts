import { getItemDetails } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(async ({ params }) => {
  const item = await getItemDetails(params.slug);
  return item;
});
