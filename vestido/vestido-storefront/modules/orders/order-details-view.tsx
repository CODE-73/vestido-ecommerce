import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useOrder, useReturnableItems } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import ReturnReplaceDialog from '../ReturnOrExchange/return-exchange-dialog';
import CancelOrderDialog from './cancel-order-dialog';
import { useOrderItemsDetailedStatus } from './use-order-item-detailed-status';

type OrderDetailsProps = {
  orderId: string;
};
const formattedDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const OrderDetailsView: FC<OrderDetailsProps> = ({ orderId }) => {
  const router = useRouter();
  const { data: { data: order } = { data: null } } = useOrder(orderId);
  console.log('order return data', order);

  const orderItemsDetails = useOrderItemsDetailedStatus(order);
  console.log('hook', orderItemsDetails);
  const [isCancelledOrder, setIsCancelledOrder] = useState(
    order?.orderStatus === 'CANCELLED',
  );

  const { data: { data: returnableItems } = { data: [] } } = useReturnableItems(
    order?.id ?? null,
  );

  const hasReturnableItems = (returnableItems?.length || 0) > 0;

  useEffect(() => {
    if (!orderId) {
      router.replace('/');
    }
  }, [router, orderId]);

  if (!orderId) {
    return null;
  }

  const submittedFulfillments = order?.fulfillments.filter(
    (x) => x.status != 'DRAFT',
  );
  const hasSubmittedFulfillment = (submittedFulfillments?.length ?? 0) > 0;
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
              {isCancelledOrder ? <div>Order Cancelled!</div> : 'Order Details'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              <div className="flex gap-1">
                <div className="text-muted-foreground hidden md:block">
                  Order
                </div>
                <div className="font-medium">#{order?.order_no.toString()}</div>
              </div>
            </CardDescription>
          </CardHeader>
          {hasReturnableItems && (
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

        <CardContent className="grid gap-4 ">
          {order?.orderStatus === 'CONFIRMED' &&
          order?.deliveryStatus === 'UNFULFILLED' ? (
            <div className="text-xs font-bold uppercase">Ready to Ship</div>
          ) : (
            <div>{order?.orderStatus}</div>
          )}
          <div className="text-sm flex flex-col md:flex-row md:divide-x gap-2 md:gap-5 ">
            <div className="flex  gap-1">
              <div className="text-muted-foreground">Date:</div> &nbsp;
              {order && formattedDate(new Date(order.createdAt))}
            </div>
          </div>
          <div className="text-xs text-muted-foreground -mb-2">
            Products included in this order: <hr className="-mb-2" />
          </div>

          <div className="flex flex-col gap-3">
            {orderItemsDetails.map((orderItem) => (
              <div key={orderItem.id} className={`py-3 bg-gray-200 rounded-lg`}>
                <div className="grid grid-cols-6  items-center">
                  <ItemImage
                    item={orderItem.item}
                    width={40}
                    height={60}
                    className="justify-self-center rounded-lg "
                  />
                  <div className="text-xs col-span-3 ">
                    {orderItem.item.title}
                  </div>
                  <div className="text-sm  justify-self-center">
                    {formatINR(orderItem.price)}
                  </div>
                  <div className="text-sm  justify-self-center">
                    x{orderItem.qty}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full mt-2">
                  {' '}
                  {orderItem.statuses.length > 0 &&
                    orderItem.statuses.map((fulfillment) => (
                      <div
                        key={fulfillment.fulfillmentId}
                        className="relative flex bg-blue-500/20 py-3 rounded-lg mx-4"
                      >
                        <div
                          className={`${fulfillment.return ? 'absolute top-1/2 -translate-y-1/2 right-3 font-semibold text-xs border border-2 text-white border-blue-500/50 px-3 py-1 rounded-full bg-blue-500/30' : 'hidden'} `}
                        >
                          Return
                        </div>
                        <div className="px-1 text-sm text-center basis-1/4">
                          {fulfillment.qty}
                        </div>
                        <div className="px-1 text-sm capitalize basis-3/4">
                          {fulfillment.title}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="grid gap-1">
            <div className="text-xs text-muted-foreground">Total Amount</div>
            <div className="font-medium">
              {formatINR(order?.grandTotal as number)}
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-xs text-muted-foreground">
              Delivery Information
            </div>
            <address className="not-italic">
              <div>
                {`${order?.shippingAddress.firstName} ${order?.shippingAddress.lastName}`.trim()}
              </div>
              <div>{order?.shippingAddress.line1}</div>
              <div>{order?.shippingAddress.line2}</div>
            </address>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 md:flex-row md:justify-between">
          <Link href="/profile" className="w-full md:w-auto" prefetch={false}>
            <Button className="w-full">Back</Button>
          </Link>
          {!hasSubmittedFulfillment && !isCancelledOrder && (
            <CancelOrderDialog
              orderId={order?.id as string}
              orderNo={order?.order_no}
              onOrderCancelled={() => setIsCancelledOrder(true)}
            >
              <Button className="w-full md:w-auto" variant="outline">
                Cancel Order
              </Button>
            </CancelOrderDialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetailsView;
