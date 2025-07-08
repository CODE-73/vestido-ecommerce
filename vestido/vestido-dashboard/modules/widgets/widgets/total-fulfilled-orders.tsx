import { Card, CardContent } from '@vestido-ecommerce/shadcn-ui/card';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useFulfilledOrders } from '@vestido-ecommerce/widgets/client';

import { type GroupBy, isValidGroupBy } from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type FulfilledWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const FulfilledOrdersWidget: React.FC = () => {
  const defaultFilters = { groupBy: 'daily' };
  return (
    <WidgetWrapper widgetId="orders" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <FulfilledOrdersDisplay />
    </WidgetWrapper>
  );
};

const FulfilledOrdersDisplay: React.FC<FulfilledWidgetProps> = ({
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

  const { data: orders } = useFulfilledOrders(filter);
  const fulfilled_orders =
    orders?.data?.reduce((sum, item) => {
      return sum + Number(item.fulfilled_orders);
    }, 0) ?? 0;

  return (
    <Card className="w-full h-full pt-2">
      <CardContent>
        <h4 className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Fulfilled Orders
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {fulfilled_orders}
        </p>
      </CardContent>
    </Card>
  );
};

export default FulfilledOrdersWidget;
