import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getOrderCount(_body: BaseReportFilter) {
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
    Array<{ period: string; total_orders: bigint }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      COUNT(*) AS total_orders
    FROM "Order"
    WHERE "createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)}
    GROUP BY period
    ORDER BY period;
  `;

  const actualData = result.map((item) => ({
    ...item,
    total_orders: item.total_orders.toString(),
  }));

  const allPeriods = generatePeriods(
    new Date(fromDate),
    new Date(toDate),
    groupBy,
  );

  // Step 1: Create a Map from actualData for constant-time lookup
  const actualMap = new Map(
    actualData.map(({ period, total_orders }) => [
      period,
      total_orders.toString(),
    ]),
  );

  // Step 2: Fill in all periods using the map
  const merged = allPeriods.map((period) => ({
    period,
    total_orders: actualMap.get(period) ?? '0',
  }));

  return merged;
}
