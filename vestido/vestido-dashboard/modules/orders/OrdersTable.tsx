import { useState } from 'react';
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

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedData = data?.data.slice().sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    // Retrieve values for comparison
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];

    // Handle null or undefined values explicitly
    if (aValue == null && bValue == null) return 0; // Both are null or undefined
    if (aValue == null) return direction === 'asc' ? -1 : 1; // Null comes first or last based on direction
    if (bValue == null) return direction === 'asc' ? 1 : -1; // Null comes first or last based on direction

    // Compare non-null values
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;

    return 0; // Values are equal
  });

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const renderSortArrow = (key: string) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === 'asc' ? '▲' : '▼'; // Use Unicode characters for arrows
  };

  const handleRowClick = (order: string) => {
    router.push(`/orders/${encodeURIComponent(order)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => handleSort('order_no')}
            className="cursor-pointer"
          >
            Order Number {renderSortArrow('order_no')}
          </TableHead>
          <TableHead
            onClick={() => handleSort('id')}
            className="cursor-pointer"
          >
            Order ID {renderSortArrow('id')}
          </TableHead>
          <TableHead
            onClick={() => handleSort('orderStatus')}
            className="cursor-pointer"
          >
            Status {renderSortArrow('orderStatus')}
          </TableHead>
          <TableHead
            onClick={() => handleSort('grandTotal')}
            className="cursor-pointer"
          >
            Price {renderSortArrow('grandTotal')}
          </TableHead>
          <TableHead
            onClick={() => handleSort('dateTime')}
            className="cursor-pointer"
          >
            Date {renderSortArrow('dateTime')}
          </TableHead>
          <TableHead
            onClick={() => handleSort('dateTime')}
            className="cursor-pointer"
          >
            Time {renderSortArrow('dateTime')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData?.map((order) => (
          <TableRow
            key={order.id}
            onClick={() => handleRowClick(order.id)}
            className="cursor-pointer"
          >
            <TableCell className="font-semibold capitalize">
              {order.order_no.toString()}
            </TableCell>
            <TableCell className="font-semibold capitalize">
              {order.id}
            </TableCell>
            <TableCell className="font-semibold capitalize">
              {order.orderStatus}
            </TableCell>
            <TableCell>{formatINR(order.grandTotal)}</TableCell>
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
