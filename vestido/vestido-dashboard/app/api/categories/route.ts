import { authMiddleware } from '@vestido-ecommerce/auth';
import { createCategory, listCategories } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(authMiddleware, async ({ request }) => {
  const args = Object.fromEntries(request.nextUrl.searchParams.entries());
  const categories = await listCategories(args);
  return categories;
});

export const POST = apiRouteHandler(authMiddleware, async ({ request }) => {
  const body = await request.json();
  const newCategory = await createCategory(body);
  return newCategory;
});
