import { DonutChart } from '@tremor/react';

import { Card, CardContent } from '@vestido-ecommerce/shadcn-ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRevenueByCategory } from '@vestido-ecommerce/widgets/client';

import { formatPeriod, type GroupBy, isValidGroupBy } from '../formatters';
import { ValidRangeComponent } from './valid-range-component';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type RevenueByCategoryProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const RevenueByCategory: React.FC = () => {
  const defaultFilters = {
    groupBy: 'daily',
  };

  return (
    <WidgetWrapper
      widgetId="revenue_by_category"
      defaultFilters={defaultFilters}
    >
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <RevenueByCategoryDisplay />
    </WidgetWrapper>
  );
};

const RevenueByCategoryDisplay: React.FC<RevenueByCategoryProps> = ({
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

  const { data: revenue_by_category } = useRevenueByCategory(filter);
  const groupByOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;
  // const [datas, setDatas] = useState<TooltipProps | null>(null);

  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-center px-5 pt-5 text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        <h3> Revenue By Category</h3>
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
      <CardContent className="flex-1 flex items-center justify-center pt-0 text-[10px]">
        {' '}
        <ValidRangeComponent
          fromDate={fromDate}
          toDate={toDate}
          groupBy={groupBy}
        >
          <DonutChart
            data={
              revenue_by_category?.success
                ? revenue_by_category.data.map(
                    (value: {
                      categoryName: string;
                      totalRevenue: string;
                    }) => ({
                      name: formatPeriod(value.categoryName, groupBy),
                      revenue: Number(value.totalRevenue),
                    }),
                  )
                : []
            }
            variant="pie"
            category="revenue"
            showAnimation
            index="name"
            showTooltip
            valueFormatter={(number: number) =>
              `$${Intl.NumberFormat('en-US').format(number)}`
            }
          />
        </ValidRangeComponent>
      </CardContent>
    </Card>
  );
};

export default RevenueByCategory;
