import Image from 'next/image';

import { useOrder } from '@vestido-ecommerce/orders';
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
      </div>

      <div className="bg-white">
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
  );
};

export default OrderDetails;
