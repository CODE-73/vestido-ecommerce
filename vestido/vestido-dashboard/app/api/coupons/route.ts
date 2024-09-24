import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { createCoupon, getCouponsList } from '@vestido-ecommerce/coupons';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const args = Object.fromEntries(request.nextUrl.searchParams.entries());
    const items = await getCouponsList(args);

    return items;
  },
);

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const body = await request.json();
    const newCoupon = await createCoupon(body);

    return newCoupon;
  },
);
