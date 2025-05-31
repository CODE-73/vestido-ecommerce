import { differenceInDays, parseISO, sub } from 'date-fns';

import { getPrismaClient } from '@vestido-ecommerce/models';

import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getPeriodOverPeriod(_body: BaseReportFilter) {
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

  const from = parseISO(fromDate);
  const to = parseISO(toDate);
  const days = differenceInDays(to, from) + 1;

  const previousFromDate = sub(from, { days });

  const result = await prisma.$queryRaw<
    Array<{ period: string; period_type: string; total_orders: bigint }>
  >`
    WITH all_orders AS (
      SELECT 
        "createdAt",
        to_char("createdAt", ${dateFormat}) AS period,
        CASE 
          WHEN "createdAt" BETWEEN ${from} AND ${to} THEN 'current'
          ELSE 'previous'
        END AS period_type
      FROM "Order"
      WHERE "createdAt" BETWEEN ${previousFromDate} AND ${to}
    )
    SELECT 
      period,
      period_type,
      COUNT(*) AS total_orders
    FROM all_orders
    GROUP BY period, period_type
    ORDER BY period;
  `;

  return result.map((r) => ({
    ...r,
    total_orders: r.total_orders.toString(),
  }));
}
