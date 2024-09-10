import { FC, SVGProps, useEffect } from 'react';
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

type OrderConfirmationProps = {
  orderId: string;
};

const OrderConfirmationView: FC<OrderConfirmationProps> = ({ orderId }) => {
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

  return (
    <div className="flex flex-col items-center justify-center h-100 mt-10">
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
            <div className="font-medium">{order?.id}</div>
          </div>
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
              View Order Details
            </Button>
          </Link>
          <Link href="/" className="w-full md:w-auto" prefetch={false}>
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
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

function CircleCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default OrderConfirmationView;
