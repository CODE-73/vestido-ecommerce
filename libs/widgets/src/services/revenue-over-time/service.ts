import { getPrismaClient } from '@vestido-ecommerce/models';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getRevenue(_body: BaseReportFilter) {
  const prisma = getPrismaClient();

  const body = BaseReportFilterSchema.parse(_body);
  const { fromDate, toDate, groupBy } = body;

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

  return result.map((item) => ({
    ...item,
    total_revenue: item.total_revenue.toString(),
  }));
}
