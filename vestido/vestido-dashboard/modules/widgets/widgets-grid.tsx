import OrderTrendWidget from './order-count-trend';
import RevenueWidget from './revenue-widget';

const WidgetsGrid: React.FC = () => {
  return (
    <div className={`lg:pt-24 px-4 bg-slate-300 h-screen`}>
      <div className="wrapper w-full grid sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-10">
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

        <OrderTrendWidget />
        <RevenueWidget />
      </div>
    </div>
  );
};

export default WidgetsGrid;
