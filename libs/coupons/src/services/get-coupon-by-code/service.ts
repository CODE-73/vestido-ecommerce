import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getCouponByCode(couponCode: string) {
  const prisma = getPrismaClient();

  const coupon = await prisma.coupon.findFirst({
    where: {
      coupon: couponCode,
      active: true,
    },
  });

  return coupon;
}
