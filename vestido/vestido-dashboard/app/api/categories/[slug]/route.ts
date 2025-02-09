import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import {
  categoryDetails,
  deleteCategory,
  updateCategory,
} from '@vestido-ecommerce/items';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const category = await categoryDetails(params.slug);
    return category;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const data = await request.json();
    const r = await updateCategory(params.slug, data);
    return r;
  },
);

export const DELETE = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const deletedcategory = await deleteCategory(params.slug);
    return deletedcategory;
  },
);
