import { BarChart, Card } from '@tremor/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRevenueAmount } from '@vestido-ecommerce/widgets/client';

import {
  dataFormatter,
  formatPeriod,
  type GroupBy,
  isValidGroupBy,
} from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type RevenueWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const RevenueWidget: React.FC = () => {
  const defaultFilters = { groupBy: 'daily' };
  return (
    <WidgetWrapper widgetId="revenue" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <RevenueWidgetDisplay />
    </WidgetWrapper>
  );
};

const RevenueWidgetDisplay: React.FC<RevenueWidgetProps> = ({
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

  const { data: revenue } = useRevenueAmount(filter);
  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;

  return (
    <Card>
      <div className="flex items-center justify-between">
        {' '}
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Revenue
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

      <BarChart
        className="mt-6 h-80"
        data={
          revenue?.success
            ? revenue.data.map(
                (item: { period: string; total_revenue: string }) => ({
                  period: formatPeriod(item.period, groupBy),
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
