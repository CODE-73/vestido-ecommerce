import * as React from 'react';

import { NextPage } from 'next';
import { SWRConfig, unstable_serialize } from 'swr';

import { getOrder } from '@vestido-ecommerce/orders';
import { GetOrderSWRKeys } from '@vestido-ecommerce/orders/client';

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

export default ProcessingPaymentPage;
