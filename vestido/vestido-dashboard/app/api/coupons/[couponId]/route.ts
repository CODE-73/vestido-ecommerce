import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { getCoupon, updateCoupon } from '@vestido-ecommerce/coupons';
import { apiRouteHandler } from '@vestido-ecommerce/utils';
import { VestidoError } from '@vestido-ecommerce/utils';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ params }) => {
    const coupon = await getCoupon(params.couponId);
    return coupon;
  },
);

export const PUT = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request, params }) => {
    const body = await request.json();

    const isCouponExist = await getCoupon(params.couponId);
    if (!isCouponExist) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Coupon does not exist',
        httpStatus: 404,
        context: {
          couponId: params.couponId,
        },
      });
    }
    const coupon = await updateCoupon(params.couponId, body);
    return coupon;
  },
);
