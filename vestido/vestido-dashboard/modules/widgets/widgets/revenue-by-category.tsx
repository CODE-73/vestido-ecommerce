import { Card, DonutChart } from '@tremor/react';

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
    <Card>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Revenue By Category
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
        <div className="h-80 w-full">
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
        </div>
      </ValidRangeComponent>
    </Card>
  );
};

export default RevenueByCategory;
