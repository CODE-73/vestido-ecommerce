import { getPrismaClient } from '@vestido-ecommerce/models';

import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getRevenueByCategory(_body: BaseReportFilter) {
  const prisma = getPrismaClient();
  const body = BaseReportFilterSchema.parse(_body);
  const { fromDate, toDate } = body;

  const revenueByLeafCategory = await prisma.category.findMany({
    where: {
      enabled: true,
    },
    select: {
      id: true,
      name: true,
      items: {
        select: {
          OrderItem: {
            where: {
              order: {
                orderPaymentStatus: 'CAPTURED',
              },
              createdAt: {
                gte: new Date(fromDate),
                lte: new Date(toDate),
              },
            },
            select: {
              price: true,
              qty: true,
            },
          },
        },
      },
    },
  });

  const result = revenueByLeafCategory
    .map((cat) => {
      const totalRevenue = cat.items.reduce((sum, item) => {
        const itemRevenue = item.OrderItem.reduce((itemSum, orderItem) => {
          return itemSum + orderItem.price * orderItem.qty;
        }, 0);
        return sum + itemRevenue;
      }, 0);

      return {
        categoryName: cat.name,
        totalRevenue,
      };
    })
    .filter((cat) => cat.totalRevenue > 0);

  return result;
}
