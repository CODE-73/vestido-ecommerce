import { getPrismaClient } from '@vestido-ecommerce/models';

export async function deactivateExpiredCoupons() {
  const prisma = getPrismaClient();

  await prisma.coupon.updateMany({
    where: {
      toDate: {
        lt: new Date(), // Check if `toDate` is in the past
      },
      active: true,
    },
    data: {
      active: false,
    },
  });
}

export async function activateValidCoupons() {
  const prisma = getPrismaClient();

  await prisma.coupon.updateMany({
    where: {
      fromDate: {
        lte: new Date(),
      },
      toDate: {
        gte: new Date(),
      },
      enabled: true,
      active: false,
    },
    data: {
      active: true,
    },
  });
}
