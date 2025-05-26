import OrderTrendWidget from './widgets/order-count-trend';
import RevenueWidget from './widgets/revenue-widget';
import WidgetsDateRange from './widgets-date-range';
import { WidgetsProvider } from './widgets-provider';

const Widgets: React.FC = () => {
  return (
    <div className={`lg:pt-24 px-4 bg-slate-300 h-screen`}>
 
        {/* <Card className="mx-auto max-w-md">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar percentageValue={32} className="mt-2" />
        </Card> */}
        <WidgetsProvider>
          <WidgetsDateRange />
          <div className="wrapper w-full grid sm:grid-cols-2  gap-3 mt-10">
          <OrderTrendWidget />
          <RevenueWidget /></div>
        </WidgetsProvider>
   
    </div>
  );
};

export default Widgets;
