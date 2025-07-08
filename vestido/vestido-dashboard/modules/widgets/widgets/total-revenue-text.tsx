import { Card, CardContent } from '@vestido-ecommerce/shadcn-ui/card';
import { formatINR } from '@vestido-ecommerce/utils';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRevenueAmount } from '@vestido-ecommerce/widgets/client';

import { type GroupBy, isValidGroupBy } from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type RevenueWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const RevenueTextWidget: React.FC = () => {
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
}) => {
  const groupBy: GroupBy = isValidGroupBy(rawGroupBy!) ? rawGroupBy : 'daily';

  const filter: BaseReportFilter = {
    fromDate,
    toDate,
    groupBy,
  };

  const { data: revenue } = useRevenueAmount(filter);
  const total_revenue = revenue?.data?.reduce((sum, item) => {
    return sum + Number(item.total_revenue);
  }, 0);

  return (
    <Card className="w-full h-full pt-2">
      <CardContent>
        <h4 className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total Revenue
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {formatINR(total_revenue ?? 0)}
        </p>
      </CardContent>
    </Card>
  );
};

export default RevenueTextWidget;
