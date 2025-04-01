import { useRouter } from 'next/router';

import { Fulfillment } from '@prisma/client';

import { FulfillmentListResponse } from '@vestido-ecommerce/orders/client';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

import { formattedDate, formattedTime } from '../orders/OrdersTable';

interface FulfillmentTableProps {
  data?: FulfillmentListResponse['data'];
  in_order_data?: Fulfillment[];
  in_order?: boolean;
}

const FulfillmentsTable: React.FC<FulfillmentTableProps> = ({
  data: fulfillments,
  in_order,
}) => {
  const router = useRouter();

  const handleRowClick = (fulfillmentId: string) => {
    router.push(`/fulfillments/${encodeURIComponent(fulfillmentId)}`);
  };

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {(fulfillments?.length ?? 0) > 0 ? (
          fulfillments?.map((fulfillment) => (
            <TableRow
              key={fulfillment.id}
              onClick={() => handleRowClick(fulfillment.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {fulfillment.fulfillment_no.toString()}
              </TableCell>
              {!in_order && (
                <TableCell className="font-semibold capitalize">
                  {fulfillment.order.order_no.toString()}
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
