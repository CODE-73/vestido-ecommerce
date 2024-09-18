import { FC, useEffect } from 'react';
import Image from 'next/image';
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
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import ShipmentStatus from './shipment-status';

type OrderDetailsProps = {
  orderId: string;
};

// export const formattedDate = (dateTime: Date) => {
//   const day = String(dateTime.getDate()).padStart(2, '0'); // Get day and ensure two digits
//   const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Get month and ensure two digits (months are zero-indexed in JS)
//   const year = dateTime.getFullYear(); // Get the full year

//   return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
// };

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

  useEffect(() => {
    // Route to home page if orderId is not provided
    if (!orderId) {
      router.replace('/');
    }
  }, [router, orderId]);

  if (!orderId) {
    return null;
  }

  const cardHeight = '700px';
  return (
    <div className="grid lg:grid-cols-2 gap-1 lg:gap-3 items-start justify-center mt-10">
      <Card
        style={{ height: cardHeight, minHeight: cardHeight }}
        className="w-full max-w-3xl p-3 md:p-6 md:justify-self-end"
      >
        <CardHeader className="flex flex-col items-center gap-2 p-0 lg:p-6">
          <CardTitle className="text-2xl font-semibold">
            Order Details
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            <div className="flex gap-1">
              <div className="text-muted-foreground hidden md:block">
                Order Number:{' '}
              </div>
              <div className="font-medium">{order?.id}</div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 overflow-y-scroll">
          <div className="text-lg flex flex-col md:flex-row md:divide-x gap-2 md:gap-5 ">
            <div className="flex  gap-1">
              <div className="text-muted-foreground">Date:</div> &nbsp;
              {order && formattedDate(new Date(order.dateTime))}
            </div>
            <div className="flex gap-1 text-center">
              <div className="text-muted-foreground">Time:</div> &nbsp;
              {order && formattedTime(new Date(order.dateTime))}
            </div>
          </div>
          <div className="text-muted-foreground -mb-2">
            Products included in this order: <hr className="-mb-2" />
          </div>

          <div className="flex flex-col  divide-y">
            {order?.orderItems.map((orderItem, index) => (
              <div key={index} className="py-3 grid grid-cols-8 divide-x">
                {' '}
                <Image
                  className="w-10 h-12 justify-self-center"
                  src={
                    ((orderItem.item.images ?? []) as ImageSchemaType[])[0].url!
                  }
                  alt={
                    ((orderItem.item.images ?? []) as ImageSchemaType[])[0].alt!
                  }
                  width={50}
                  height={70}
                />
                <div className="text-xs col-span-4 pl-1 ">
                  {orderItem.item.title}
                </div>
                <div className="px-1 text-sm text-center justify-self-center">
                  {orderItem.qty}
                </div>
                <div className="text-sm pl-1 col-span-2 justify-self-center">
                  ₹&nbsp;{orderItem.item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="grid gap-1">
            <div className="text-muted-foreground">Total Amount</div>
            <div className="font-medium">
              INR {order?.totalPrice.toFixed(2)}
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Delivery Information</div>
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
          <Link
            href={`/orders/${orderId}`}
            className="w-full md:w-auto"
            prefetch={false}
          >
            <Button variant="outline" className="w-full">
              Back
            </Button>
          </Link>
        </CardFooter>
      </Card>

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
                {formattedDate(new Date(fulfillment.dateTime))}
                <ShipmentStatus fulfillmentStatus={fulfillment.status} />
                <div>
                  <div className="flex flex-col  divide-y">
                    {fulfillment.fulfillmentItems.map(
                      (fulfillmentItem, index) => (
                        <div
                          key={index}
                          className="py-3 grid grid-cols-8 divide-x"
                        >
                          <Image
                            className="w-10 h-12 justify-self-center"
                            src={
                              (
                                (fulfillmentItem.orderItem.item.images ??
                                  []) as ImageSchemaType[]
                              )[0].url!
                            }
                            alt={
                              (
                                (fulfillmentItem.orderItem.item.images ??
                                  []) as ImageSchemaType[]
                              )[0].alt!
                            }
                            width={50}
                            height={70}
                          />
                          <div className="text-xs col-span-4 pl-1 ">
                            {fulfillmentItem.orderItem.item.title}
                          </div>
                          <div className="px-1 text-sm text-center justify-self-center">
                            {fulfillmentItem.orderItem.qty}
                          </div>
                          <div className="text-sm pl-1 col-span-2 justify-self-center">
                            ₹&nbsp;
                            {fulfillmentItem.orderItem.item.price.toFixed(2)}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>{' '}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/*
export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader className="flex flex-col items-center gap-2">
          <CircleCheckIcon className="text-green-500 w-12 h-12" />
          <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
          <CardDescription className="text-muted-foreground">
            Thank you for your purchase!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1">
            <div className="text-muted-foreground">Order Number</div>
            <div className="font-medium">OD-12345678</div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Total Amount</div>
            <div className="font-medium">$149.99</div>
          </div>
          <div className="grid gap-1">
            <div className="text-muted-foreground">Delivery Information</div>
            <address className="not-italic">
              <div>John Doe</div>
              <div>123 Main St.</div>
              <div>Anytown, CA 12345</div>
            </address>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 md:flex-row md:justify-between">
          <Link href="#" className="w-full md:w-auto" prefetch={false}>
            <Button variant="outline" className="w-full">
              View Order Details
            </Button>
          </Link>
          <Link href="#" className="w-full md:w-auto" prefetch={false}>
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
*/

export default OrderDetailsView;
