import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import { getOrder } from '@vestido-ecommerce/orders';
import { GetOrderSWRKeys } from '@vestido-ecommerce/orders/client';

import OrderDetailsView from '../../../modules/orders/order-details-view';

type OrderDetailsPageProps = {
  fallback: Record<string, unknown>;
  orderId: string;
};

const OrderDetailsPage: NextPage<OrderDetailsPageProps> = ({
  orderId,
  fallback,
}) => {
  /*
  const router = useRouter();
  const orderId = router.query.orderId as string;

  if (!router.isReady) {
    return null;
  }
    */

  return (
    <SWRConfig value={{ fallback }}>
      <OrderDetailsView orderId={orderId} />
    </SWRConfig>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(params.orderId);
  console.log('order is page', order);
  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orderId: params.orderId,
      fallback: {
        // useOrder(orderId)
        [unstable_serialize([
          GetOrderSWRKeys.GET,
          GetOrderSWRKeys.ORDER,
          params.orderId,
        ])]: {
          data: JSON.parse(JSON.stringify(order)),
          success: true,
        },
      },
    },
  };
}

export default OrderDetailsPage;
