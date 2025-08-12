import { Card, CardContent } from '@vestido-ecommerce/shadcn-ui/card';
import { BaseReportFilter } from '@vestido-ecommerce/widgets';
import { useAuthAnalytics } from '@vestido-ecommerce/widgets/client';

import { type GroupBy, isValidGroupBy } from '../formatters';
import { InjectedWidgetProps, WidgetWrapper } from './widget-wrapper';

type LoginsWidgetProps = InjectedWidgetProps<{
  groupBy: GroupBy;
}>;

const LoginCountWidget: React.FC = () => {
  const defaultFilters = { groupBy: 'daily' };
  return (
    <WidgetWrapper widgetId="logins" defaultFilters={defaultFilters}>
      {/* @ts-expect-error Props are filled by the WidgetWrapper */}
      <LoginsWidgetDisplay />
    </WidgetWrapper>
  );
};

const LoginsWidgetDisplay: React.FC<LoginsWidgetProps> = ({
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

  const { data: login_data } = useAuthAnalytics(filter);
  const login_count = login_data?.data?.reduce((sum, item) => {
    return sum + Number(item.login_count);
  }, 0);

  return (
    <Card className="w-full h-full pt-2">
      <CardContent>
        <h4 className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Logins
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {login_count ?? 0}
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCountWidget;
