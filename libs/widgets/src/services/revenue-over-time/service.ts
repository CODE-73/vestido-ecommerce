import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getRevenue(_body: BaseReportFilter) {
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
    Array<{ period: string; total_revenue: bigint }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      SUM("grandTotal")::bigint AS total_revenue
    FROM "Order"
    WHERE "createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)}
      AND "orderPaymentStatus" = 'CAPTURED'
    GROUP BY period
    ORDER BY period;
  `;

  const actualData = result.map((item) => ({
    ...item,
    total_revenue: item.total_revenue.toString(),
  }));

  const allPeriods = generatePeriods(
    new Date(fromDate),
    new Date(toDate),
    groupBy,
  );

  const actualMap = new Map(
    actualData.map(({ period, total_revenue }) => [
      period,
      total_revenue.toString(),
    ]),
  );

  const merged = allPeriods.map((period) => ({
    period,
    total_revenue: actualMap.get(period) ?? '0',
  }));

  return merged;
}
