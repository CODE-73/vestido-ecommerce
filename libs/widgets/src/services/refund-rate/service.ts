import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getRefundRate(_body: BaseReportFilter) {
  const prisma = getPrismaClient();

  const body = BaseReportFilterSchema.parse(_body);
  const { fromDate, toDate, groupBy } = body;

  validatePeriodRange({ fromDate, toDate, groupBy });

  let dateFormat: string;
  switch (groupBy) {
    case 'daily':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'weekly':
      dateFormat = 'IYYY-"W"IW'; // ISO week format
      break;
    case 'monthly':
      dateFormat = 'YYYY-MM';
      break;
    case 'yearly':
      dateFormat = 'YYYY';
      break;
    default:
      throw new Error(`Unsupported groupBy: ${groupBy}`);
  }

  const result = await prisma.$queryRaw<
    Array<{
      period: string;
      total_orders: number;
      refunded_orders: number;
    }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      COUNT(*) AS total_orders,
      SUM(CASE 
        WHEN "orderPaymentStatus" IN ('REFUNDED', 'PARTIALLY_REFUNDED') 
        THEN 1 ELSE 0 
      END)::integer AS refunded_orders
    FROM "Order"
    WHERE "createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)}
    GROUP BY period
    ORDER BY period;
  `;

  const actualData = result.map((item) => {
    const totalOrders = Number(item.total_orders);
    const refundedOrders = Number(item.refunded_orders);
    const refundRate =
      totalOrders > 0
        ? ((refundedOrders / totalOrders) * 100).toFixed(2)
        : '0.00';

    return {
      period: item.period,
      refundRate: refundRate.toString(), // Ensure refundRate is a string to match original logic
    };
  });

  // Step 2: Generate all periods
  const allPeriods = generatePeriods(
    new Date(fromDate),
    new Date(toDate),
    groupBy,
  );

  // Step 3: Create a Map from actualData for constant-time lookup
  const actualMap = new Map(
    actualData.map(({ period, refundRate }) => [period, refundRate]),
  );

  // Step 4: Fill in all periods using the map
  const merged = allPeriods.map((period) => ({
    period,
    refundRate: actualMap.get(period) ?? '0.00', // Default to '0.00' if period not found
  }));

  return merged;
}
