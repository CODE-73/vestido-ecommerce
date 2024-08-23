import Image from 'next/image';
import { useRouter } from 'next/router';

import { GetOrderResponse } from '@vestido-ecommerce/orders';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

type CreateFulfillmentDialogProps = {
  order: GetOrderResponse['data'];
};
export const CreateFulfillmentDialog: React.FC<
  CreateFulfillmentDialogProps
> = ({ order }) => {
  const router = useRouter();

  const handleCreateClick = () => {
    router.replace('/fulfillments/new');
  };
  return (
    <>
      {/* {isDialogOpen && ( */}
      <DialogContent>
        <DialogHeader className="col-span-6">
          <DialogTitle>
            <div className="flex">Create Fulfillment</div>
          </DialogTitle>
          <DialogDescription className="col-span-6">
            Choose items and corresponding quantities to go in this fuifillment
          </DialogDescription>
        </DialogHeader>
        <hr />
        <div className="bg-white col-span-6">
          <div className="p-4 text-lg font-semibold">Order Items</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead> <TableHead>Item</TableHead>
                <TableHead>Pending Qty</TableHead>
                <TableHead>Fulfilling Qty</TableHead>
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
                    {orderItem.qty} {/* total qty - already fulfilled */}
                  </TableCell>{' '}
                  <TableCell className="font-semibold capitalize">
                    {orderItem.qty}
                    {/* fulfilling qty */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="w-full col-span-6">
          <Button
            onClick={() => handleCreateClick()}
            className="w-full uppercase text-base tracking-wide"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* )} */}
    </>
  );
};
