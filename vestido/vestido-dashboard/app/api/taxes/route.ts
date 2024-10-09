import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { createTax, listTax } from '@vestido-ecommerce/tax';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const items = await listTax(args);

    return items;
  },
);
export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const body = await request.json();
    const newTax = await createTax(body);

    return newTax;
  },
);
