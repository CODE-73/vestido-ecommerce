import { getPrismaClient } from '@vestido-ecommerce/models';

import { UpdateCouponSchema, UpdateCouponSchemaType } from './zod';

export async function updateCoupon(
  couponId: string,
  data: UpdateCouponSchemaType,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateCouponSchema.parse(data);

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
