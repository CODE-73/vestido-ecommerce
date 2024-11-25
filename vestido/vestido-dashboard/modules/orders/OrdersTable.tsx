import { useRouter } from 'next/router';

import { type ListAdminOrderResponse } from '@vestido-ecommerce/orders';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';
import { formatINR } from '@vestido-ecommerce/utils';
// import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

interface ProductTableProps {
  data: ListAdminOrderResponse | undefined;
}
export const formattedDate = (dateTime: Date) => {
  const day = String(dateTime.getDate()).padStart(2, '0'); // Get day and ensure two digits
  const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Get month and ensure two digits (months are zero-indexed in JS)
  const year = dateTime.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};

export const formattedTime = (dateTime: Date) => {
  let hours = dateTime.getHours(); // Get hours (0-23)
  const minutes = String(dateTime.getMinutes()).padStart(2, '0'); // Get minutes and ensure two digits
  const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
};

const OrdersTable: React.FC<ProductTableProps> = ({ data }) => {
  const router = useRouter();

  const handleRowClick = (order: string) => {
    router.push(`/orders/${encodeURIComponent(order)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order Number</TableHead>
          <TableHead>Customer ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.data.map((order) => (
            <TableRow
              key={order.id}
              onClick={() => handleRowClick(order.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {order.order_no.toString()}
              </TableCell>
              <TableCell className="font-semibold capitalize">
                {order.customerId}
              </TableCell>
              <TableCell className="font-semibold capitalize">
                {order.orderStatus}
              </TableCell>
              <TableCell> {formatINR(order.totalPrice)}</TableCell>
              <TableCell>{formattedDate(new Date(order.dateTime))}</TableCell>
              <TableCell>{formattedTime(new Date(order.dateTime))}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default OrdersTable;
