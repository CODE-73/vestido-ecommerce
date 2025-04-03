import { FC } from 'react';
import Link from 'next/link';

import { useOrder, useReturnableItems } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';

import ReturnReplaceDialog from '../return-or-exchange/return-exchange-dialog';
import { useOrderItemsDetailedStatus } from './hooks/use-order-item-detailed-status';
import CancelOrderDialog from './cancel-order-dialog';
import OrderDetailsViewOrderItem from './order-details-view-order-item';

type OrderDetailsProps = {
  orderId: string;
};

const OrderDetailsView: FC<OrderDetailsProps> = ({ orderId }) => {
  const { data: { data: order } = { data: null } } = useOrder(orderId);

  const orderItemsDetails = useOrderItemsDetailedStatus(order);
  const isCancelledOrder = order?.orderStatus === 'CANCELLED';
  const canCancelOrder = order?.orderStatus === 'CONFIRMED';

  const { data: { data: returnableItems } = { data: [] } } = useReturnableItems(
    order?.id ?? null,
  );

  if (!orderId) {
    return null;
  }

  const cardHeight = '700px';
  return (
    <div className="flex justify-center">
      <Card
        style={{ height: cardHeight, minHeight: cardHeight }}
        className={`w-full max-w-4xl p-3 md:p-6 overflow-y-scroll ${
          isCancelledOrder ? 'md:justify-self-center' : 'md:justify-self-end'
        }`}
      >
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {isCancelledOrder ? <div>Order Cancelled!</div> : 'Order Details'}{' '}
            </CardTitle>
            <div className="text-muted-foreground">
              <div className="flex gap-1">
                <div className="text-muted-foreground hidden md:block">
                  Order
                </div>
                <div className="font-medium">#{order?.order_no.toString()}</div>
              </div>
            </div>
          </CardHeader>
          {canCancelOrder && (
            <div className="flex gap-2 p-3 md:pt-6 ">
              <CancelOrderDialog orderId={order?.id} orderNo={order?.order_no}>
                <Button className="basis-1/2">Cancel Order</Button>
              </CancelOrderDialog>
            </div>
          )}
          {(returnableItems ?? []).length > 0 && (
            <div className="flex gap-2 p-3 md:pt-6 ">
              <ReturnReplaceDialog
                order={order}
                isReturn
                returnableItems={returnableItems ?? []}
              >
                <Button className="basis-1/2">Return Items</Button>
              </ReturnReplaceDialog>
              <ReturnReplaceDialog
                returnableItems={returnableItems ?? []}
                order={order}
              >
                <Button className="basis-1/2">Replace Items</Button>
              </ReturnReplaceDialog>
            </div>
          )}
        </div>

        <CardContent className="grid gap-4">
          {orderItemsDetails.map((orderItem) => (
            <OrderDetailsViewOrderItem
              key={orderItem.id}
              orderItem={orderItem}
            />
          ))}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 md:flex-row md:justify-between">
          <Link href="/profile" className="w-full md:w-auto" prefetch={false}>
            <Button className="w-full">Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetailsView;
