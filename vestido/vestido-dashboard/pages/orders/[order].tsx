import { useRouter } from 'next/router';

import { NextPage } from 'next';

import OrderDetailsView from '../../modules/orders/OrderDetailsView';

const OrderDetails: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.order;

  return <OrderDetailsView orderId={orderId as string} />;
};

export default OrderDetails;
