import { getPrismaClient } from '@vestido-ecommerce/models';

import { ListCouponArgs } from './types';
import { ListCouponSchema } from './zod';

export async function getCouponsList(data: ListCouponArgs) {
  const prisma = getPrismaClient();
  const args = ListCouponSchema.parse(data ?? {});

  const couponList = await prisma.coupon.findMany({
    ...(args?.q
      ? {
          where: {
            OR: [{ coupon: { contains: args.q, mode: 'insensitive' } }],
          },
        }
      : {}),
  });
  return couponList;
}
