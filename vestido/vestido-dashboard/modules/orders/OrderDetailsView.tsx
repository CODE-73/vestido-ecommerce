import Image from 'next/image';

import {
  LuCreditCard,
  LuMail,
  LuMapPin,
  LuPhone,
  LuUser,
} from 'react-icons/lu';

import { useOrder } from '@vestido-ecommerce/orders';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@vestido-ecommerce/shadcn-ui/card';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { CreateFulfillmentDialog } from './CreateFulfillmentDialog';
import { formattedDate, formattedTime } from './OrdersTable';
type OrderDetailsProps = {
  orderId: string;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { data } = useOrder(orderId);
  const order = data?.data;
  console.log(order);

  return (
    <div className="container mx-auto py-10 bg-slate-200 mt-16">
      <div className="flex items-center py-5 gap-3 justify-between">
        <h1 className="text-lg font-semibold">Order Details</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-14 col-start-6">Create a Fulfillment</Button>
          </DialogTrigger>
          {order && <CreateFulfillmentDialog order={order} />}
        </Dialog>
      </div>
      <div className="grid grid-cols-6 gap-3">
        <Card className="col-span-6">
          <CardTitle className="text-xl p-3 font-normal ">
            <div className="flex justify-between">
              <div>
                <span className="text-base text-gray-500">Order ID: </span>
                {order?.id}
              </div>
              <div className="text-lg flex divide-x gap-5">
                <div>{order && formattedDate(new Date(order.dateTime))}</div>
                <div>{order && formattedTime(new Date(order.dateTime))}</div>
              </div>
            </div>
          </CardTitle>
          <CardContent className="gap-4 grid grid-cols-3 max-w-xl">
            <div className="">Order Status: </div>
            <div className="font-semibold col-span-2">{order?.status}</div>
            <div className="">Total Amount:</div>
            <div className="font-semibold col-span-2">{order?.totalPrice}</div>
            <div className="">Amount Paid: </div>
            <div className="font-semibold col-span-2">
              {/* {order?.payments.map((payment) => payment.amount)} */}
              ₹1599.00
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Customer Details</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className=" grid grid-rows-2 grid-flow-col grid-cols-6">
              <div className="row-span-2 ">
                <LuUser size={40} />
              </div>

              <div className="col-span-5">
                {order?.customer.firstName}&nbsp;{order?.customer.lastName}
              </div>
              <div className="text-gray-500 text-sm col-span-5">Customer</div>
            </div>

            <hr />

            <div className="flex items-center gap-3">
              <LuMail size={30} strokeWidth={0.6} />
              {order?.customer.email}
            </div>
            <div className="flex items-center gap-3">
              <LuPhone size={30} strokeWidth={0.6} />
              +91&nbsp;{order?.customer.mobile}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">
              <div className="flex items-center gap-3">
                <LuMapPin size={30} strokeWidth={0.6} />
                Shipping Address
              </div>
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div>
                {order?.shippingAddress.firstName}&nbsp;
                {order?.shippingAddress.lastName}
              </div>
              <div>{order?.shippingAddress.line1}</div>
              <div>{order?.shippingAddress.line2}</div>
              <div>{order?.shippingAddress.district}</div>
              <div>{order?.shippingAddress.state}</div>
              <div>Pin: {order?.shippingAddress.pinCode}</div>
              <div>Mobile: {order?.shippingAddress.mobile}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">
              <div className="flex items-center gap-3">
                <LuCreditCard size={30} strokeWidth={0.6} />
                Payment Details
              </div>
            </CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="gap-3 grid grid-cols-2">
            <div className="justify-self-end">Payment Status: </div>
            <div className="font-semibold">
              {/* {order?.payments.map((payment) => payment.status)} */}
              PENDING
            </div>
            <div className="justify-self-end">Gateway: </div>
            <div className="font-semibold">
              {/* {order?.payments.map((payment) => payment.paymentGateway)} */}
              Razorpay
            </div>
            <div className="justify-self-end">Amount Paid: </div>
            <div className="font-semibold">
              {/* {order?.payments.map((payment) => payment.amount)} */}
              ₹1599.00
            </div>
          </CardContent>
        </Card>
        <div className="bg-white col-span-6">
          <div className="p-4 text-lg font-semibold">Order Items</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Variant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.orderItems?.map((orderItem, index) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell>
                    <Image
                      className="w-10 h-12"
                      src={
                        ((orderItem.item.images ?? []) as ImageSchemaType[])[0]
                          .url!
                      }
                      alt={
                        ((orderItem.item.images ?? []) as ImageSchemaType[])[0]
                          .alt!
                      }
                      width={50}
                      height={70}
                    />
                  </TableCell>
                  <TableCell className="font-semibold capitalize">
                    {orderItem.item.title}
                  </TableCell>
                  <TableCell className="font-semibold capitalize">
                    {orderItem.qty}
                  </TableCell>
                  <TableCell> ₹&nbsp;{orderItem.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {
                      orderItem.item.variants.find(
                        (x) => x.id == orderItem.variantId,
                      )?.title
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
      {/*


       */}
    </div>
  );
};

export default OrderDetails;
