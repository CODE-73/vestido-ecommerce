import { BarChart, Card } from '@tremor/react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRefundRate } from '@vestido-ecommerce/widgets/client';

import {
  dataFormatter,
  formatPeriod,
  type GroupBy,
  isValidGroupBy,
} from '../formatters';
import { ValidRangeComponent } from './valid-range-component';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type RefundRateWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const RefundRateWidget: React.FC = () => {
  const defaultFilters = {
    groupBy: 'daily',
  };

  return (
    <WidgetWrapper widgetId="refund_rate" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <RefundRateDisplay />
    </WidgetWrapper>
  );
};

const RefundRateDisplay: React.FC<RefundRateWidgetProps> = ({
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

  const { data: refund_rate } = useRefundRate(filter);
  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;

  return (
    <Card>
      <div className="flex justify-between items-center">
        {' '}
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Refund Rate
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
            refund_rate?.success
              ? refund_rate.data.map(
                  (value: { period: string; refundRate: string }) => ({
                    period: formatPeriod(value.period, groupBy),
                    arefundRate: value.refundRate,
                  }),
                )
              : []
          }
          index="period"
          categories={['refund_rate']}
          colors={['blue']}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </ValidRangeComponent>
    </Card>
  );
};

export default RefundRateWidget;
