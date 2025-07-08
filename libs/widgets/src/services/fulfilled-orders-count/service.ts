import { getPrismaClient } from '@vestido-ecommerce/models';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getFulfilledOrderCount(_body: BaseReportFilter) {
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
    Array<{ period: string; fulfilled_orders: bigint }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      COUNT(*) AS fulfilled_orders
    FROM "Order"
    WHERE 
      "createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)}
      AND "deliveryStatus" = 'COMPLETED'
    GROUP BY period
    ORDER BY period;
  `;

  const actualData = result.map((item) => ({
    ...item,
    fulfilled_orders: item.fulfilled_orders.toString(),
  }));

  const allPeriods = generatePeriods(
    new Date(fromDate),
    new Date(toDate),
    groupBy,
  );

  const actualMap = new Map(
    actualData.map(({ period, fulfilled_orders }) => [
      period,
      fulfilled_orders,
    ]),
  );

  const merged = allPeriods.map((period) => ({
    period,
    fulfilled_orders: actualMap.get(period) ?? '0',
  }));

  return merged;
}
