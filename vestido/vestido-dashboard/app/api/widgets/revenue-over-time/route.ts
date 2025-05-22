import { authMiddleware, roleMiddleware } from '@vestido-ecommerce/auth';
import { apiRouteHandler } from '@vestido-ecommerce/utils';
import { BaseReportFilterSchema, getRevenue } from '@vestido-ecommerce/widgets';

export const GET = apiRouteHandler(
  authMiddleware,
  roleMiddleware('ADMIN'),
  async ({ request }) => {
    const url = new URL(request.url);
    const queryParams = {
      fromDate: url.searchParams.get('fromDate'),
      toDate: url.searchParams.get('toDate'),
      groupBy: url.searchParams.get('groupBy'),
    };

    const body = BaseReportFilterSchema.parse(queryParams);

    const revenueData = await getRevenue(body);

    return revenueData;
  },
);
