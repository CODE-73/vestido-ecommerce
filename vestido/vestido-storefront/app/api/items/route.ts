import { listItem } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ request }) => {
  const args = Object.fromEntries(request.nextUrl.searchParams.entries());
  const items = await listItem({
    ...args,
    enabled: true,
    limit: args.limit ? parseInt(args.limit) : undefined,
    offset: args.offset ? parseInt(args.offset) : undefined,
  });

  for (const item of items) {
    item.variants = item.variants.filter((x) => x.enabled);
  }

  return items;
});
