import cron from 'node-cron';

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

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running coupon deactivation cron job...');
  await deactivateExpiredCoupons();
});
