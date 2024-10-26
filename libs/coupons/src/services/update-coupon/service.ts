import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { UpdateCouponSchema, UpdateCouponSchemaType } from './zod';

export async function updateCoupon(
  couponId: string,
  data: UpdateCouponSchemaType,
) {
  const prisma = getPrismaClient();

  const validatedData = UpdateCouponSchema.parse(data);

  const isActive =
    validatedData.enabled &&
    new Date(validatedData.fromDate) <= new Date() &&
    new Date(validatedData.toDate) >= new Date();

  // Check if an active coupon with the same code already exists, excluding the current coupon
  const existingActiveCoupon = await prisma.coupon.findFirst({
    where: {
      coupon: validatedData.coupon,
      active: true,
      id: {
        not: couponId,
      },
    },
  });

  if (existingActiveCoupon && isActive) {
    throw new VestidoError({
      name: 'ErrorActiveCouponAlreadyExist',
      message: `CouponCode ${validatedData.coupon} is already exist and active`,
    });
  }

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
