import { useRouter } from 'next/router';

import { Fulfillment } from '@prisma/client';

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
  data: Fulfillment[];
}

const FulfillmentsTable: React.FC<FulfillmentTableProps> = ({
  data: fulfillments,
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
          <TableHead>Fulfillment ID</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Shiprocker Order ID</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fulfillments.length > 0 ? (
          fulfillments.map((fulfillment) => (
            <TableRow
              key={fulfillment.id}
              onClick={() => handleRowClick(fulfillment.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {fulfillment.fulfillment_no.toString()}
              </TableCell>
              <TableCell className="font-semibold capitalize">
                {fulfillment.id}
              </TableCell>
              <TableCell className="font-semibold capitalize">
                {fulfillment.orderId}
              </TableCell>
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
