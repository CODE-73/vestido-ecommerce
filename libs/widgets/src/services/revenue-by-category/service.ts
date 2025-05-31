import { getPrismaClient } from '@vestido-ecommerce/models';

import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getRevenueByCategory(_body: BaseReportFilter) {
  const prisma = getPrismaClient();
  const body = BaseReportFilterSchema.parse(_body);
  const { fromDate, toDate } = body;

  const revenueByLeafCategory = await prisma.$queryRaw<
    Array<{ categoryName: string; totalRevenue: number }>
  >` 
  SELECT  
    c.name as categoryName, 
    COALESCE(SUM(oi.price * oi.qty), 0) AS totalRevenue
  FROM "Category" c
  LEFT JOIN "Item" i ON i."categoryId" = c.id
  LEFT JOIN "OrderItem" oi ON oi."itemId" = i.id
  LEFT JOIN "Order" o ON o.id = oi."orderId"
  WHERE c.enabled = true
    AND (oi."createdAt" BETWEEN ${new Date(fromDate)} AND ${new Date(toDate)})
    AND o."orderPaymentStatus" = 'CAPTURED'
  GROUP BY categoryName
  ORDER BY totalRevenue DESC;
`;

  return revenueByLeafCategory;
}
