import { BarChart, Card } from '@tremor/react';

import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRevenueAmount } from '@vestido-ecommerce/widgets/client';

import { dataFormatter, formatPeriod } from '../../formatters/formatters';

const filter: BaseReportFilter = {
  fromDate: '2025-01-01',
  toDate: '2025-05-16',
  groupBy: 'monthly',
};

const RevenueWidget: React.FC = () => {
  const { data: revenue } = useRevenueAmount(filter);
  return (
    <Card>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Revenue
      </h3>
      <BarChart
        className="mt-6 h-80"
        data={
          revenue?.success
            ? revenue.data.map(
                (item: { period: string; total_revenue: string }) => ({
                  period: formatPeriod(item.period),
                  total_revenue: Number(item.total_revenue),
                }),
              )
            : []
        }
        index="period"
        categories={['total_revenue']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default RevenueWidget;
