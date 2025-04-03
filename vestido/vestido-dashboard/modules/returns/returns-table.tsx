import { useRouter } from 'next/router';

import { ListReturnOrderResult } from '@vestido-ecommerce/orders';
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

interface ReturnTableProps {
  data?: ListReturnOrderResult;
}

const ReturnsTable: React.FC<ReturnTableProps> = ({ data: returns }) => {
  console.log('returns', returns);
  const router = useRouter();

  const handleRowClick = (returnId: string) => {
    router.push(`/returns/${encodeURIComponent(returnId)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Return No.</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Shipment ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>RefundStatus</TableHead>

          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(returns?.length ?? 0) > 0 ? (
          returns?.map((_return) => (
            <TableRow
              key={_return.id}
              onClick={() => handleRowClick(_return.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {_return.return_no.toString()}
              </TableCell>
              <TableCell>{_return.type}</TableCell>
              <TableCell className="font-semibold capitalize">
                {_return.shipmentId}
              </TableCell>
              <TableCell>{_return.status}</TableCell>

              <TableCell className="font-semibold capitalize">
                {_return.refundStatus}
              </TableCell>

              <TableCell>
                {formattedDate(new Date(_return.createdAt))}
              </TableCell>
              <TableCell>
                {formattedTime(new Date(_return.createdAt))}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="text-center">
            <TableCell colSpan={10}>No Return Requests made yet.</TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ReturnsTable;
