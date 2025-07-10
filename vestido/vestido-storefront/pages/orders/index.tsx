import { NextPage } from 'next';
import { SWRConfig } from 'swr';

import OrderListView from '../../modules/orders/order-list/order-list';

const AllOrdersPage: NextPage = () => {
  return (
    <SWRConfig>
      <OrderListView />;
    </SWRConfig>
  );
};
export default AllOrdersPage;
