import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import { getOrder } from '@vestido-ecommerce/orders';
import { GetOrderSWRKeys } from '@vestido-ecommerce/orders/client';

import OrderConfirmationView from '../../modules/orders/order-confirmation-view';

type OrderConfirmationPageProps = {
  fallback: Record<string, unknown>;
  orderId: string;
};

const OrderConfirmationPage: NextPage<OrderConfirmationPageProps> = ({
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
      <OrderConfirmationView orderId={orderId} />
    </SWRConfig>
  );
};

export async function getServerSideProps({
  query,
}: {
  query: { orderId: string };
}) {
  const order = await getOrder(query.orderId);
  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orderId: query.orderId,
      fallback: {
        // useOrder(orderId)
        [unstable_serialize([
          GetOrderSWRKeys.GET,
          GetOrderSWRKeys.ORDER,
          query.orderId,
        ])]: {
          data: JSON.parse(JSON.stringify(order)),
          success: true,
        },
      },
    },
  };
}

export default OrderConfirmationPage;
