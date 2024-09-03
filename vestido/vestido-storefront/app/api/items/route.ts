import { listItem } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(async ({ request }) => {
  const args = Object.fromEntries(request.nextUrl.searchParams.entries());
  const items = await listItem(args);
  return items;
});
