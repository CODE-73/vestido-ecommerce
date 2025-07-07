import { Card } from '@vestido-ecommerce/shadcn-ui/card';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useRevenueAmount } from '@vestido-ecommerce/widgets/client';

import { type GroupBy, isValidGroupBy } from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type RevenueWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const ProductsWidget: React.FC = () => {
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

  return (
    <Card className="w-full h-full">
      <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Sales
      </h4>
      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        $71,465
      </p>
    </Card>
  );
};

export default ProductsWidget;
