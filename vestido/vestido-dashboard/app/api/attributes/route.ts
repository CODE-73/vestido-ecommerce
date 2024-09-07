import { authMiddleware } from '@vestido-ecommerce/auth';
import { createAttribute, listAttribute } from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(authMiddleware, async ({ request }) => {
  const args = Object.fromEntries(request.nextUrl.searchParams.entries());
  const attributes = await listAttribute(args);
  return attributes;
});

export const POST = apiRouteHandler(authMiddleware, async ({ request }) => {
  const body = await request.json();
  const newAttribute = await createAttribute(body);
  return newAttribute;
});
