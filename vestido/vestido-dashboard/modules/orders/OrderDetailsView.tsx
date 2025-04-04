import { useState } from 'react';

import {
  LuCreditCard,
  LuMail,
  LuMapPin,
  LuPhone,
  LuUser,
} from 'react-icons/lu';
import * as z from 'zod';

import { useOrder, useUpdateOrder } from '@vestido-ecommerce/orders/client';
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import FulfillmentsTable from '../fulfillments/FulfillmentsTable';
import { CreateFulfillmentDialog } from './CreateFulfillmentDialog';
import ItemInOrderDetails from './item-in-order-details';
import { formattedDate, formattedTime } from './OrdersTable';
import ReturnsTable from '../returns/returns-table';
type OrderDetailsProps = {
  orderId: string;
};

export type UpdateOrderForm = z.infer<typeof UpdateOrderFormSchema>;
const UpdateOrderFormSchema = z.object({
  id: z.string(),
  description: z.string(),
});

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { data: { data: order } = { data: null } } = useOrder(orderId);
  const { trigger: updateOrderTrigger } = useUpdateOrder();

  const { toast } = useToast();

  const [description, setDescription] = useState('');
  const handleUpdateOrder = async (data: UpdateOrderForm) => {
    try {
      await updateOrderTrigger(data);
      toast({
        title: 'Order Updated Successfully',
      });
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

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
                <span className="text-base text-gray-500">Order Number: </span>
                {order?.order_no.toString()}
              </div>
              <div className="text-lg flex divide-x gap-5">
                <div>{order && formattedDate(new Date(order.createdAt))}</div>
                <div>{order && formattedTime(new Date(order.createdAt))}</div>
              </div>
            </div>
          </CardTitle>
          <CardContent className="gap-4 grid grid-cols-3 max-w-xl">
            <div className="">Order Status: </div>
            <div className="font-semibold col-span-2">{order?.orderStatus}</div>
            <div className="">Total Amount:</div>
            <div className="font-semibold col-span-2">{order?.grandTotal}</div>
            <div className="">Amount Paid: </div>
            <div className="font-semibold col-span-2">
              {order?.payments.map((payment) => payment.amount)}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardTitle className="text-xl p-3 font-normal ">
            <div className="flex justify-between">
              <div>
                <span className="text-base text-gray-500">Add a Note: </span>
              </div>
            </div>
          </CardTitle>
          <CardContent className="flex items-center justify-between max-w-full">
            <span className="text-base text-gray-500">Note:</span>
            <textarea
              className="flex-1 mx-3 p-2 border rounded-md text-sm text-gray-700"
              placeholder="Enter a note about the order"
              value={description} // Bind to a state variable
              onChange={(e) => setDescription(e.target.value)} // Update the state
            />
            <button
              className={`px-4 py-2 rounded-md text-white ${
                description
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={() =>
                handleUpdateOrder({ id: order?.id || '', description })
              } // Trigger your handler
              disabled={!description} // Disable button when description is empty
            >
              Save Note
            </button>
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-3 xl:col-span-2">
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
        <Card className="col-span-6 md:col-span-3  xl:col-span-2">
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
        <Card className="col-span-6 xl:col-span-2">
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
              {order?.payments.map((payment) => payment.status)}
            </div>
            <div className="justify-self-end">Gateway: </div>
            <div className="font-semibold">
              {order?.payments.map((payment) => payment.paymentGateway)}
            </div>
            <div className="justify-self-end">Amount Paid: </div>
            <div className="font-semibold">
              {order?.payments.map((payment) => payment.amount)}
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
                <TableHead>Fulfilled/Total Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.orderItems?.map((orderItem, index) => (
                <ItemInOrderDetails orderItem={orderItem} key={index} />
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
        <div className="bg-white col-span-6">
          <div className="p-4 text-lg font-semibold">Fulfillments</div>
          {order?.fulfillments.length && order.fulfillments.length > 0 ? (
            <div className="bg-white">
              <FulfillmentsTable
                in_order
                in_order_data={order.fulfillments}

              />
            </div>
          ) : (
            <div className='text-sm p-3'>No Fulfillments yet</div>
          )}
        </div>
        <div className="bg-white col-span-6">
          <div className="p-4 text-lg font-semibold">Returns/Exchanges</div>
          {order?.fulfillments?.length && order?.fulfillments?.length > 0 ? (
            // <div className="bg-white">
            //   {order.fulfillments.map((fulfillment) => {
            //     console.log('fulfilment', fulfillment)
            //     return (
            //       <ReturnsTable data={fulfillment.returns} />)
            //   })}
            // </div>
            <div className="bg-white">

              <ReturnsTable in_order in_order_data={order.fulfillments} />

            </div>
          ) : (
            <div className='text-sm p-3'>No Return or Replacement requests on items in this order</div>
          )}

        </div>
      </div>

    </div>
  );
};

export default OrderDetails;
