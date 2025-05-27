import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getAverageOrderValue(_body: BaseReportFilter) {
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
    Array<{ period: string; total_revenue: bigint; total_orders: number }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      SUM("grandTotal")::bigint AS total_revenue,
      COUNT(*) AS total_orders
    FROM "Order"
    WHERE "createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)}
      AND "orderPaymentStatus" = 'CAPTURED'
    GROUP BY period
    ORDER BY period;
  `;

  const actualData = result.map((item) => {
    const totalRevenue = Number(item.total_revenue);
    const totalOrders = Number(item.total_orders);
    const aov =
      totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';

    return {
      period: item.period,
      aov: aov.toString(), // Ensure aov is a string to match original logic
    };
  });

  // Step 2: Generate all periods
  const allPeriods = generatePeriods(
    new Date(fromDate),
    new Date(toDate),
    groupBy,
  );

  // Step 3: Create a Map from actualData for constant-time lookup
  const actualMap = new Map(actualData.map(({ period, aov }) => [period, aov]));

  // Step 4: Fill in all periods using the map
  const merged = allPeriods.map((period) => ({
    period,
    aov: actualMap.get(period) ?? '0.00', // Default to '0.00' if period not found
  }));

  return merged;
}
