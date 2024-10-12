import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { UpdateCouponSchema, UpdateCouponSchemaType } from './zod';

export async function updateCoupon(
  couponId: string,
  data: UpdateCouponSchemaType,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateCouponSchema.parse(data);

  // Check if an active coupon with the same code already exists
  const existingCoupon = await prisma.coupon.findFirst({
    where: {
      coupon: validatedData.coupon,
      active: true,
      NOT: { id: couponId },
    },
  });

  if (existingCoupon) {
    throw new VestidoError({
      name: 'CouponCodeAlreadyActive',
      message: `Coupon ${validatedData.coupon} Already Active`,
    });
  }

  const isActive =
    validatedData.enabled &&
    validatedData.fromDate <= new Date() &&
    validatedData.toDate >= new Date();

  const updatedCoupon = await prisma.coupon.update({
    where: {
      id: couponId,
    },
    data: {
      coupon: validatedData.coupon,
      description: validatedData.description,
      fromDate: validatedData.fromDate,
      toDate: validatedData.toDate,
      enabled: validatedData.enabled,
      active: isActive,
      discountType: validatedData.discountType,
      discountAmount: validatedData.discountAmount,
      discountPercent: validatedData.discountPercent,
    },
  });

  return updatedCoupon;
}
