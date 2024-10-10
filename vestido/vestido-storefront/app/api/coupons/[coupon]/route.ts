import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { validateCoupon } from '@vestido-ecommerce/coupon';
import { apiRouteHandler, VestidoError } from '@vestido-ecommerce/utils';

export const POST = apiRouteHandler(
  authMiddleware,
  roleMiddleware('CUSTOMER'),
  async ({ params }) => {
    const isValidCoupon = await validateCoupon(params.coupon);

    if (!isValidCoupon) {
      throw new VestidoError({
        name: 'NotFoundError',
        message: 'Invalid Coupon ',
        httpStatus: 404,
        context: {
          paymentId: params.coupon,
        },
      });
    }
  },
);
