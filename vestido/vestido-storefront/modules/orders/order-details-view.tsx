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
  const [isCancelledOrder, setIsCancelledOrder] = useState(
    order?.orderStatus === 'CANCELLED',
  );

  const { data: { data: returnableItems } = { data: [] } } = useReturnableItems(
    order?.id ?? null,
  );

  const hasReturnableItems = (returnableItems?.length || 0) > 0;

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

  // const orderItemFulfillmentStatus = (orderItemId: string) =>
  //   order?.fulfillments.find((x) =>
  //     x.fulfillmentItems.some((y) => y.orderItemId === orderItemId),
  //   )?.status;

  function orderItemFulfillments(orderItemId: string) {
    const fulfillmentsWithTheOrderItem = order?.fulfillments.filter((x) =>
      x.fulfillmentItems.some((y) => y.orderItemId === orderItemId),
    );

    const rows = fulfillmentsWithTheOrderItem?.map((fulfillment) => {
      const matchingFulfillmentItem = fulfillment.fulfillmentItems.find(
        (item) => item.orderItemId === orderItemId,
      );
      return {
        fulfillmentId: fulfillment.id,
        quantity: matchingFulfillmentItem?.quantity ?? 0, // Extract the quantity
        status: fulfillment.status, // Extract the fulfillment status
      };
    });

    return rows || [];
  }

  // const hasReturnedOrReplacedQty = (orderItemId: string) => (

  // )

  const submittedFulfillments = order?.fulfillments.filter(
    (x) => x.status != 'DRAFT',
  );
  const hasSubmittedFulfillment = (submittedFulfillments?.length ?? 0) > 0;
  const cardHeight = '700px';
  return (
    <div
      // className={`grid gap-1 items-start justify-center mt-10 ${
      //   isCancelledOrder ? 'grid-cols-1' : 'lg:grid-cols-2 lg:gap-3'
      // }`}
      className="flex justify-center"
    >
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
            {order?.orderItems.map((orderItem, index) => {
              const hasFulfilledQty =
                orderItem.fulfilledQuantity && orderItem.fulfilledQuantity > 0;
              const hasReturnedOrReplacedQty =
                orderItem.replacedQty > 0 || orderItem.returnedQty > 0;

              return (
                <div
                  key={index}
                  className={`py-3 grid grid-cols-8 bg-gray-300  rounded-lg pb-8`}
                >
                  <ItemImage
                    item={orderItem.item}
                    width={60}
                    height={90}
                    className="justify-self-center rounded-lg ml-4 row-span-2"
                  />

                  <div className="text-xs col-span-3 pl-1 ">
                    {orderItem.item.title}
                  </div>
                  <div className="text-sm pl-1  justify-self-center">
                    {formatINR(orderItem.price)}
                  </div>

                  {hasFulfilledQty &&
                    orderItemFulfillments(orderItem.id).map((fulfillment) => (
                      <div key={fulfillment.fulfillmentId}>
                        <div
                          className="px-1 text-sm text-center justify-self-center col-start-6
                        "
                        >
                          {fulfillment.status === 'DELIVERED' ? (
                            <div>
                              {fulfillment.quantity -
                                (orderItem.returnedQty + orderItem.replacedQty)}
                            </div>
                          ) : (
                            <div>{fulfillment.quantity}</div>
                          )}
                        </div>
                        <div className="px-1 text-sm text-center justify-self-center">
                          {fulfillment.status}
                        </div>
                      </div>
                    ))}

                  {!hasReturnedOrReplacedQty && (
                    <>
                      <div className="px-1 text-sm text-center justify-self-center col-start-6">
                        {orderItem.qty - (orderItem.fulfilledQuantity ?? 0)}
                      </div>
                      <div className="px-1 text-sm text-center ">
                        not shipped yet
                      </div>
                    </>
                  )}
                  {hasReturnedOrReplacedQty && (
                    <>
                      <div className="px-1 text-sm text-center justify-self-center col-start-6">
                        {orderItem.returnedQty || orderItem.replacedQty}
                      </div>
                      <div>
                        return
                        <span>
                          {orderItem.returnStatus ||
                            orderItem.replacementStatus}
                        </span>
                      </div>
                    </>
                  )}
                  {/* {order.orderStatus == 'IN_PROGRESS' && (
                  <div className="text-sm pl-1  justify-self-center">
                  
                  </div>
                )} */}
                </div>
              );
            })}
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

      {/* {!isCancelledOrder && (
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
      )} */}
    </div>
  );
};

export default OrderDetailsView;
