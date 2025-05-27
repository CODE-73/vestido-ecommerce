import { BarChart, Card } from '@tremor/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useAverageOrderValue } from '@vestido-ecommerce/widgets/client';

import {
  dataFormatter,
  formatPeriod,
  type GroupBy,
  isValidGroupBy,
} from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type AverageValueWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const AverageOrderValueWidget: React.FC = () => {
  const defaultFilters = {
    groupBy: 'daily',
  };

  return (
    <WidgetWrapper
      widgetId="average_order_value"
      defaultFilters={defaultFilters}
    >
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <AverageOrderValueDisplay />
    </WidgetWrapper>
  );
};

const AverageOrderValueDisplay: React.FC<AverageValueWidgetProps> = ({
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

  const { data: average_order_value } = useAverageOrderValue(filter);
  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;

  return (
    <Card>
      <div className="flex justify-between items-center">
        {' '}
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Average Order Value
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
          average_order_value?.success
            ? average_order_value.data.map(
                (value: { period: string; aov: string }) => ({
                  period: formatPeriod(value.period, groupBy),
                  aov: value.aov,
                }),
              )
            : []
        }
        index="period"
        categories={['aov']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default AverageOrderValueWidget;
