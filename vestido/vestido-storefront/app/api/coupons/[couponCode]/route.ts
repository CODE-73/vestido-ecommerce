import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getCouponByCode } from '@vestido-ecommerce/coupons';
import { apiRouteHandler } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
    const coupon = await getCouponByCode(params.couponCode);
    return coupon;
  },
);
