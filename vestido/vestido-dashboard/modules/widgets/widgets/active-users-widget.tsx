import { Card, CardContent } from '@vestido-ecommerce/shadcn-ui/card';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useAuthAnalytics } from '@vestido-ecommerce/widgets/client';

import { type GroupBy, isValidGroupBy } from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type ActiveUsersWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const ActiveUsersCountWidget: React.FC = () => {
  const defaultFilters = { groupBy: 'daily' };
  return (
    <WidgetWrapper widgetId="users" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <ActiveUsersWidgetDisplay />
    </WidgetWrapper>
  );
};

const ActiveUsersWidgetDisplay: React.FC<ActiveUsersWidgetProps> = ({
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

  const { data: active_users_data } = useAuthAnalytics(filter);
  const active_count = active_users_data?.data?.reduce((sum, item) => {
    return sum + Number(item.active_users);
  }, 0);
  console.log('activeuserscount', active_count);

  return (
    <Card className="w-full h-full pt-2">
      <CardContent>
        <h4 className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Active Users
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {active_count ?? 0}
        </p>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersCountWidget;
