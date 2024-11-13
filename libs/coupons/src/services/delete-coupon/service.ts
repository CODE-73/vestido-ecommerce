import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function deleteCoupon(couponId: string) {
  if (!couponId) {
    throw new VestidoError({
      name: 'CouponIdRequired',
      message: 'Coupon ID is required',
      httpStatus: 400,
      context: {
        couponId,
      },
    });
  }
  const prisma = getPrismaClient();

  const deletedcoupon = await prisma.coupon.delete({
    where: {
      id: couponId,
    },
  });
  return deletedcoupon;
}
