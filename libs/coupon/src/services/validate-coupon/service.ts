import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

export async function validateCoupon(coupon: string) {
  const prisma = getPrismaClient();

  const IsCoupon = await prisma.coupon.findFirst({
    where: {
      coupon: coupon,
      active: true,
    },
    select: {
      id: true,
      discountType: true,
      discountAmount: true,
      discountPercent: true,
    },
  });

  if (!IsCoupon) {
    throw new VestidoError({
      name: 'InvalidCouponCode',
      message: `Coupon ${coupon} is Invalid`,
    });
  }

  return IsCoupon;
}
