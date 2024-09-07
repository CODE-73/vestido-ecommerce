import { authMiddleware } from '@vestido-ecommerce/auth';
import {
  categoryDetails,
  deleteCategory,
  updateCategory,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export const GET = apiRouteHandler(authMiddleware, async ({ params }) => {
  const category = await categoryDetails(params.slug);
  return category;
});

export const PUT = apiRouteHandler(
  authMiddleware,
  async ({ request, params }) => {
    const data = await request.json();
    const r = await updateCategory(params.slug, data);
    return r;
  },
);

export const DELETE = apiRouteHandler(authMiddleware, async ({ params }) => {
  const deletedcategory = await deleteCategory(params.slug);
  return deletedcategory;
});
