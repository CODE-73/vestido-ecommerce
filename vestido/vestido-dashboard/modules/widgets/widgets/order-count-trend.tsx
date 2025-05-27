import { BarChart, Card } from '@tremor/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useOrderCount } from '@vestido-ecommerce/widgets/client';

import {
  dataFormatter,
  formatPeriod,
  type GroupBy,
  isValidGroupBy,
} from '../formatters';
import { ValidRangeComponent } from './valid-range-component';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type OrderTrendWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const OrderCountTrendWidget: React.FC = () => {
  const defaultFilters = {
    groupBy: 'daily',
  };

  return (
    <WidgetWrapper widgetId="order_count" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <OrderTrendWidgetDisplay />
    </WidgetWrapper>
  );
};

const OrderTrendWidgetDisplay: React.FC<OrderTrendWidgetProps> = ({
  fromDate,
  toDate,
  widgetFilters: { groupBy: rawGroupBy = 'daily' } = { groupBy: 'daily' },
  onWidgetFilterChange,
}) => {
  const groupBy: GroupBy = isValidGroupBy(rawGroupBy!) ? rawGroupBy : 'daily';

  const filter: BaseReportFilter = {
    fromDate,
    toDate,
    groupBy,
  };

  const { data: order_count } = useOrderCount(filter);
  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;

  return (
    <Card>
      <div className="flex justify-between items-center">
        {' '}
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Order Count
        </h3>
        <Select
          value={groupBy}
          onValueChange={(value) =>
            onWidgetFilterChange('groupBy', value as GroupBy)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Group By" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {groupByOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ValidRangeComponent
        fromDate={fromDate}
        toDate={toDate}
        groupBy={groupBy}
      >
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
      </ValidRangeComponent>
    </Card>
  );
};

export default OrderCountTrendWidget;
