import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useOrder } from '@vestido-ecommerce/orders/client';
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
import ReturnReplaceDialog from '../ReturnOrReplace/return-exchange-dialog';
import CancelOrderDialog from './cancel-order-dialog';
import ShipmentStatus from './shipment-status';

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

export const formattedTime = (dateTime: Date) => {
  let hours = dateTime.getHours(); // Get hours (0-23)
  const minutes = String(dateTime.getMinutes()).padStart(2, '0'); // Get minutes and ensure two digits
  const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
};

const OrderDetailsView: FC<OrderDetailsProps> = ({ orderId }) => {
  const router = useRouter();
  const { data: { data: order } = { data: null } } = useOrder(orderId);
  const [isCancelledOrder, setIsCancelledOrder] = useState(
    order?.orderStatus === 'CANCELLED',
  );

  // const hasDeliveredFulfillments =
  //   (order?.fulfillments?.filter((x) => x.status === 'DELIVERED').length ?? 0) >
  //   0;

  useEffect(() => {
    // Route to home page if orderId is not provided
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
    <div
      className={`grid gap-1 items-start justify-center mt-10 ${
        isCancelledOrder ? 'grid-cols-1' : 'lg:grid-cols-2 lg:gap-3'
      }`}
    >
      <Card
        style={{ height: cardHeight, minHeight: cardHeight }}
        className={`w-full max-w-3xl p-3 md:p-6 ${
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
          <div className="flex gap-2 p-3 md:pt-6 ">
            <ReturnReplaceDialog order={order} isReturn>
              <Button className="basis-1/2">Return Items</Button>
            </ReturnReplaceDialog>
            <ReturnReplaceDialog order={order}>
              <Button className="basis-1/2">Replace Items</Button>
            </ReturnReplaceDialog>
          </div>
        </div>

        <CardContent className="grid gap-4 overflow-y-scroll">
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
            <div className="flex gap-1 text-center">
              <div className="text-muted-foreground">Time:</div> &nbsp;
              {order && formattedTime(new Date(order.createdAt))}
            </div>
          </div>
          <div className="text-xs text-muted-foreground -mb-2">
            Products included in this order: <hr className="-mb-2" />
          </div>

          <div className="flex flex-col  divide-y">
            {order?.orderItems.map((orderItem, index) => (
              <div key={index} className="py-3 grid grid-cols-8 divide-x">
                <ItemImage
                  item={orderItem.item}
                  width={50}
                  height={70}
                  className="w-10 h-12 justify-self-center"
                />
                <div className="text-xs col-span-4 pl-1 ">
                  {orderItem.item.title}
                </div>
                <div className="px-1 text-sm text-center justify-self-center">
                  {orderItem.qty}
                </div>
                <div className="text-sm pl-1 col-span-2 justify-self-center">
                  {formatINR(orderItem.price)}
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
      {!isCancelledOrder && (
        <div>
          <Card
            className="p-3 md:p-6 max-w-3xl"
            style={{ height: cardHeight, minHeight: cardHeight }}
          >
            <CardHeader className="flex flex-col items-center gap-2">
              <CardTitle className="text-2xl font-semibold text-center">
                Shipment Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <div className="flex gap-1">
                  <div className="text-muted-foreground">Order Number: </div>
                  <div className="font-medium">{order?.id}</div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 max-h-[80%] overflow-y-scroll">
              {order?.fulfillments.map((fulfillment, index) => (
                <div
                  key={index}
                  className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
                >
                  {formattedDate(new Date(fulfillment.createdAt))}
                  <ShipmentStatus fulfillmentStatus={fulfillment.status} />
                  <div>
                    <div className="flex flex-col  divide-y">
                      {fulfillment.fulfillmentItems.map(
                        (fulfillmentItem, index) => (
                          <div
                            key={index}
                            className="py-3 grid grid-cols-8 divide-x"
                          >
                            <ItemImage
                              item={fulfillmentItem?.orderItem?.item}
                              width={50}
                              height={70}
                              className="w-10 h-12 justify-self-center"
                            />
                            <div className="text-xs col-span-4 pl-1 ">
                              {fulfillmentItem?.orderItem?.item.title}
                            </div>
                            <div className="px-1 text-sm text-center justify-self-center">
                              {fulfillmentItem?.orderItem?.qty}
                            </div>
                            <div className="text-sm pl-1 col-span-2 justify-self-center">
                              {formatINR(fulfillmentItem?.orderItem?.price)}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsView;
