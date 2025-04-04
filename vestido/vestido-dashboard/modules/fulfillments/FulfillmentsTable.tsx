import { useRouter } from 'next/router';

import { Fulfillment } from '@prisma/client';
import { LuTrash } from 'react-icons/lu';

import {
  FulfillmentListResponse,
  useDeleteFulfillment,
} from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { formattedDate, formattedTime } from '../orders/OrdersTable';

interface FulfillmentTableProps {
  data?: FulfillmentListResponse['data'];
  in_order?: boolean;
  in_order_data?: Fulfillment[]
}

const FulfillmentsTable: React.FC<FulfillmentTableProps> = ({
  data: fulfillments,
  in_order,
  in_order_data: _fulfillments

}) => {
  const router = useRouter();
  const { trigger } = useDeleteFulfillment();
  const { toast } = useToast();

  const handleRowClick = (fulfillmentId: string) => {
    router.push(`/fulfillments/${encodeURIComponent(fulfillmentId)}`);
  };

  const handleDelete = async (fulfillmentId: string) => {
    try {
      await trigger(fulfillmentId);
      toast({
        title: 'Deleted Draft Fulfillment',
      });
    } catch (e) {
      console.error('Error deleting fulfillmentId', e);
      toast({
        title: 'Error deleting Fulfillment',
      });
    }
  };

  const fulfillmentlist = fulfillments ?? _fulfillments ?? [];
  const isMainFulfillments = fulfillmentlist === fulfillments;


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fulfillment No.</TableHead>
          {!in_order && <TableHead>Order No.</TableHead>}
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Shiprocker Order ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(fulfillmentlist?.length ?? 0) > 0 ? (
          fulfillmentlist?.map((fulfillment) => (
            <TableRow
              key={fulfillment.id}
              onClick={() => handleRowClick(fulfillment.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {fulfillment.fulfillment_no.toString()}
              </TableCell>
              {isMainFulfillments && 'order' in fulfillment && (
              <TableCell className="font-semibold capitalize">
                {(fulfillment as { order: { order_no: string } }).order.order_no.toString()}
              </TableCell>
            )}
              <TableCell>
                {formattedDate(new Date(fulfillment.createdAt))}
              </TableCell>
              <TableCell>
                {formattedTime(new Date(fulfillment.createdAt))}
              </TableCell>

              <TableCell>{fulfillment.shiprocket_order_id}</TableCell>
              <TableCell>{fulfillment.status}</TableCell>
              {fulfillment.status == 'DRAFT' && (
                <TableCell>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(fulfillment.id);
                    }}
                    variant="ghost"
                  >
                    <LuTrash />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow className="text-center">
            <TableCell colSpan={10}>No fulfillments made yet.</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default FulfillmentsTable;
