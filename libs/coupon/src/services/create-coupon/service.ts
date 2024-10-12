import { getPrismaClient } from '@vestido-ecommerce/models';
import { VestidoError } from '@vestido-ecommerce/utils';

import { CreateCouponSchema, CreateCouponSchemaType } from './zod';

export async function createCoupon(data: CreateCouponSchemaType) {
  const prisma = getPrismaClient();

  const validatedData = CreateCouponSchema.parse(data);

  // Check if an active coupon with the same code already exists
  const existingCoupon = await prisma.coupon.findFirst({
    where: {
      coupon: validatedData.coupon,
      active: true,
    },
  });

  if (existingCoupon) {
    throw new VestidoError({
      name: 'CouponCodeAlreadyActive',
      message: `Coupon ${validatedData.coupon} Already Active`,
    });
  }

  // Calculate whether the coupon should be active
  const isActive =
    validatedData.enabled &&
    validatedData.fromDate <= new Date() &&
    validatedData.toDate >= new Date();

  const coupon = await prisma.coupon.create({
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

  return coupon;
}
