import ActiveUsersCountWidget from './widgets/active-users-widget';
import AverageOrderValueWidget from './widgets/average-order-value';
import OrderTrendWidget from './widgets/order-count-trend';
import RefundRateWidget from './widgets/refund-rate';
import RevenueByCategory from './widgets/revenue-by-category';
import RevenueWidget from './widgets/revenue-widget';
import SignupCountWidget from './widgets/signups-count-widget';
import FulfilledOrdersWidget from './widgets/total-fulfilled-orders';
import LoginCountWidget from './widgets/total-logins-widgets';
import OrdersTextWidget from './widgets/total-orders';
import RevenueTextWidget from './widgets/total-revenue-text';
import WidgetsDateRange from './widgets-date-range';
import { WidgetsProvider } from './widgets-provider';

const Widgets: React.FC = () => {
  return (
    <div className="lg:pt-24 px-4 bg-slate-300 pb-10">
      <WidgetsProvider>
        <WidgetsDateRange />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 w-full mt-10">
          <RevenueTextWidget />
          <OrdersTextWidget />
          <FulfilledOrdersWidget />
          <LoginCountWidget />
          <SignupCountWidget />
          <ActiveUsersCountWidget />
        </div>
        <div className="wrapper w-full grid sm:grid-cols-2 gap-3 mt-10">
          <OrderTrendWidget />
          <RevenueWidget />
          <AverageOrderValueWidget />
          <RevenueByCategory />
          <RefundRateWidget />
        </div>
      </WidgetsProvider>
    </div>
  );
};
export default Widgets;
