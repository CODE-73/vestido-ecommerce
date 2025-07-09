import { NextPage } from 'next';
import { SWRConfig } from 'swr';

import OrderListView from '../../modules/orders/order-list/order-list';

type AllOrdersPageProps = {
  fallback: Record<string, unknown>;
};

const AllOrdersPage: NextPage<AllOrdersPageProps> = () => {
  return (
    <SWRConfig>
      <OrderListView />;
    </SWRConfig>
  );
};
export default AllOrdersPage;
