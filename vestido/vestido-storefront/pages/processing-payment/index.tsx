import * as React from 'react';

import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import { getOrder } from '@vestido-ecommerce/orders';
import { OrderSWRKeys } from '@vestido-ecommerce/orders/client';

import ProcessingPaymentView from '../../modules/ProcessingPayment/ProcessingPaymentView';

type ProcessingPaymentPageProps = {
  fallback: Record<string, unknown>;
  orderId: string;
};

const ProcessingPaymentPage: NextPage<ProcessingPaymentPageProps> = ({
  orderId,
  fallback,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ProcessingPaymentView orderId={orderId} />
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

  if (order.orderPaymentStatus !== 'PENDING') {
    // Payment is either successful or failed
    // We redirect to the checkout page to be safe for all cases.
    return {
      redirect: {
        destination: '/checkout',
        permanent: false,
      },
    };
  }

  return {
    props: {
      orderId: query.orderId,
      fallback: {
        // useOrder(orderId)
        [unstable_serialize([
          OrderSWRKeys.GET,
          OrderSWRKeys.ORDER,
          query.orderId,
        ])]: {
          data: JSON.parse(JSON.stringify(order)),
          success: true,
        },
      },
    },
  };
}

export default ProcessingPaymentPage;
