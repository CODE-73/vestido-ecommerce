import { useState } from 'react';
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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleRowClick = (fulfillmentId: string) => {
    router.push(`/fulfillments/${encodeURIComponent(fulfillmentId)}`);
  };

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        // Toggle direction
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortedData = [...fulfillments].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    const aValue = a[key as keyof Fulfillment];
    const bValue = b[key as keyof Fulfillment];

    // Handle null or undefined values explicitly
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return direction === 'asc' ? -1 : 1;
    if (bValue == null) return direction === 'asc' ? 1 : -1;

    // Compare non-null values
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;

    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            { label: 'Fulfillment No.', key: 'fulfillment_no' },
            { label: 'Fulfillment ID', key: 'id' },
            { label: 'Order ID', key: 'orderId' },
            { label: 'Date', key: 'dateTime' },
            { label: 'Time', key: 'dateTime' },
            { label: 'Shiprocket Order ID', key: 'shiprocket_order_id' },
            { label: 'Status', key: 'status' },
          ].map(({ label, key }) => (
            <TableHead
              key={key}
              className="cursor-pointer"
              onClick={() => handleSort(key)}
            >
              {label}
              {sortConfig?.key === key && (
                <span className="ml-2">
                  {sortConfig.direction === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.length > 0 ? (
          sortedData.map((fulfillment) => (
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
                {formattedDate(new Date(fulfillment.dateTime))}
              </TableCell>
              <TableCell>
                {formattedTime(new Date(fulfillment.dateTime))}
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
