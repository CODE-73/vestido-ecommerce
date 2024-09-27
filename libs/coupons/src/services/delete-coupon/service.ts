import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deleteCoupon(couponId: string) {
  if (!couponId) {
    throw new Error('Coupon ID is required');
  }
  const prisma = getPrismaClient();

  const deletedcoupon = await prisma.coupon.delete({
    where: {
      id: couponId,
    },
  });
  return deletedcoupon;
}
