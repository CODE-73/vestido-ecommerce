import { useSearchParams } from 'next/navigation';

import { BarChart, Card } from '@tremor/react';

import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useOrderCount } from '@vestido-ecommerce/widgets/client';

import {
  dataFormatter,
  formatPeriod,
  type GroupBy,
  isValidGroupBy,
} from '../../formatters/formatters';
import { OrderFilterControls } from './filters';

const OrderTrendWidget: React.FC = () => {
  const searchParams = useSearchParams();

  const fromDate = searchParams?.get('fromDate') ?? '2025-01-01';
  const toDate = searchParams?.get('toDate') ?? '2025-05-16';
  const rawGroupBy = searchParams?.get('groupBy');
  const groupBy: GroupBy = isValidGroupBy(rawGroupBy!) ? rawGroupBy : 'monthly';

  const filter: BaseReportFilter = {
    fromDate,
    toDate,
    groupBy,
  };

  const { data: order_count } = useOrderCount(filter);

  return (
    <Card>
      <OrderFilterControls />
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Order Count
      </h3>
      <BarChart
        className="mt-6 h-80"
        data={
          order_count?.success
            ? order_count.data.map(
                (item: { period: string; total_orders: string }) => ({
                  period: formatPeriod(item.period, groupBy),
                  total_orders: Number(item.total_orders),
                }),
              )
            : []
        }
        index="period"
        categories={['total_orders']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default OrderTrendWidget;
