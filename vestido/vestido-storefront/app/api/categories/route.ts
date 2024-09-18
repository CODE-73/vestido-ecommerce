import { listCategories } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(async ({ request }) => {
  const args = Object.fromEntries(request.nextUrl.searchParams.entries());
  const categories = await listCategories({
    ...args,
    enabled: true,
  });

  return categories;
});
