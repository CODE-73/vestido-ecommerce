import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuChevronDown } from 'react-icons/lu';

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

// Order fulfillment statuses and their progress percentages
const STATUS_STAGES: Record<string, { label: string; progress: number }> = {
  ORDER_PLACED: { label: 'Order Placed', progress: 0},
  AWAITING_PICKUP: { label: 'Awaiting Pickup', progress: 25 },
  SHIPPED: { label: 'Shipped', progress: 50 },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', progress: 75 },
  DELIVERED: { label: 'Delivered', progress: 100 },
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
const [expandedFulfillments, setExpandedFulfillments] = useState<Record<string, boolean>>({});

  
    const hasReturnableItems = (returnableItems?.length || 0) > 0;
    console.log('has', returnableItems)
  
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

 const toggleExpand = (fulfillmentId: string) => {
  setExpandedFulfillments((prev) => ({
    ...prev,
    [fulfillmentId]: !prev[fulfillmentId],
  }));
}; 


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
             {isCancelledOrder ? <div>Order Cancelled!</div> : 'Order Details'}          </CardTitle>
          <CardDescription className="text-muted-foreground">
            <div className="flex gap-1">
              <div className="text-muted-foreground hidden md:block">Order</div>
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
          )}</div>

        <CardContent className="grid gap-4">
          {orderItemsDetails.map((orderItem) => (
            <div key={orderItem.id} className="py-3 bg-gray-200 rounded-lg">
              <div className="grid grid-cols-6 items-center">
                <ItemImage
                  item={orderItem.item}
                  width={40}
                  height={60}
                  className="justify-self-center rounded-lg"
                />
                <div className="text-xs col-span-3">{orderItem.item.title}</div>
                <div className="text-sm justify-self-center">{formatINR(orderItem.price)}</div>
                <div className="text-sm justify-self-center">x{orderItem.qty}</div>
              </div>

              <div className="flex flex-col gap-3 w-full mt-2">
                {orderItem.statuses.length > 0 &&
                  orderItem.statuses.map((fulfillment) => {
                    const statusInfo = STATUS_STAGES[fulfillment.title] || {
                      label: 'Unknown',
                      progress: 0,
                    };

                    return (
                      <div
                        key={fulfillment.fulfillmentId}
                        className={`relative flex flex-col bg-blue-500/20 py-3 rounded-lg mx-4 transition-all ${
                          expandedFulfillments[fulfillment.fulfillmentId] ? 'pb-6' : ''
                        }`}
                      >
                        {/* Return Badge */}
                        {fulfillment.return && (
                          <div className="absolute top-1/2 -translate-y-1/2 right-3 font-semibold text-xs border border-2 text-white border-blue-500/50 px-3 py-1 rounded-full bg-blue-500/30">
                            Return
                          </div>
                        )}

                        {/* Row with Chevron, Qty, and Title */}
                        <div className="flex items-center w-full">
                          <button
                            onClick={() => toggleExpand(fulfillment.fulfillmentId)}
                            className="px-2 text-gray-600 hover:text-gray-800 transition"
                          >
                            <LuChevronDown
                              className={`w-4 h-4 transition-transform ${
                                expandedFulfillments[fulfillment.fulfillmentId] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <div className="px-1 text-sm text-center basis-1/4">Qty:&nbsp;<span className=''>{fulfillment.qty}</span></div>
                          <div className="px-1 text-sm capitalize basis-3/4">{statusInfo.label}</div>
                        </div>

                        {/* Progress Bar (Shown When Expanded) */}
                        {expandedFulfillments[fulfillment.fulfillmentId] && (
  <div className="mt-3 px-4 relative">
    {/* Progress Bar */}
    <div className="relative h-48 w-2 sm:w-full  sm:h-2 bg-gray-300 rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
        style={{ width: `${statusInfo.progress}%` }}
      />
    </div>

    {/* Milestone Circles & Status Labels */}
    <div className="absolute top-1/2 left-0 flex w-full justify-between transform -translate-y-1/2">
      {Object.values(STATUS_STAGES).map((stage, index) => (
        <div key={stage.label} className="relative flex flex-col items-center"  style={{ width: `${statusInfo.progress}/${index}%` }}>
          {/* Circle */}
          <div
            className={`w-4 h-4 relative top-3 rounded-full border-2 flex items-center ${
              statusInfo.progress >= stage.progress ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-400'
            }`}
          />
          {/* Status Label */}
          <span className="mt-3 text-xs font-medium text-gray-700 text-center whitespace-nowrap">
            {stage.label}
          </span>
        </div>
      ))}
    </div>
    
  </div>
)}

                      </div>
                    );
                  })}
              </div>
            </div>
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

