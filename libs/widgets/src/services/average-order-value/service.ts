import { getPrismaClient } from '@vestido-ecommerce/models';

import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getAverageOrderValue(_body: BaseReportFilter) {
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

  return result.map((item) => {
    const totalRevenue = Number(item.total_revenue);
    const totalOrders = item.total_orders;
    const aov =
      totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';

    return {
      period: item.period,
      aov,
    };
  });
}
