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

const ProductsTable: React.FC<FulfillmentTableProps> = ({
  data: fulfillments,
}) => {
  const router = useRouter();

  const handleRowClick = (fulfillment: string) => {
    router.push(`/fulfillments/${encodeURIComponent(fulfillment)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>

          <TableHead>Breadth</TableHead>
          <TableHead>Height</TableHead>
          <TableHead>Length</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Shiprocker Order ID</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fulfillments &&
          fulfillments.map((fulfillment) => (
            <TableRow
              key={fulfillment.id}
              onClick={() => handleRowClick(fulfillment.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {fulfillment.orderId}
              </TableCell>
              <TableCell>
                {formattedDate(new Date(fulfillment.dateTime))}
              </TableCell>
              <TableCell>
                {formattedTime(new Date(fulfillment.dateTime))}
              </TableCell>

              <TableCell>{fulfillment.breadth}</TableCell>
              <TableCell>{fulfillment.height}</TableCell>
              <TableCell>{fulfillment.length}</TableCell>

              <TableCell className="truncate max-w-xs">
                {fulfillment.weight}
              </TableCell>
              <TableCell>{fulfillment.shiprocket_order_id}</TableCell>
              <TableCell>{fulfillment.status}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default ProductsTable;
