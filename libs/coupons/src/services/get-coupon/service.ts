import { getPrismaClient } from '@vestido-ecommerce/models';

export async function getCoupon(couponId: string) {
  const prisma = getPrismaClient();

  const coupon = await prisma.coupon.findUnique({
    where: {
      id: couponId,
    },
  });

  return coupon;
}
