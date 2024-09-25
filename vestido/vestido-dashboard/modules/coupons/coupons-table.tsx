import { useRouter } from 'next/router';

import { Coupon } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

import { formattedDate } from '../orders/OrdersTable';

interface CouponTableProps {
  data: Coupon[];
}

const CouponsTable: React.FC<CouponTableProps> = ({ data: coupons }) => {
  const router = useRouter();

  const handleRowClick = (couponId: string) => {
    router.push(`/coupons/${encodeURIComponent(couponId)}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Coupon</TableHead>
          <TableHead>From Date</TableHead>
          <TableHead>To Date</TableHead>

          <TableHead>Active</TableHead>
          <TableHead>Discount Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coupons &&
          coupons.map((coupon) => (
            <TableRow
              key={coupon.id}
              onClick={() => handleRowClick(coupon.id)}
              className="cursor-pointer"
            >
              <TableCell className="font-semibold capitalize">
                {coupon.coupon}
              </TableCell>
              <TableCell>{formattedDate(new Date(coupon.fromDate))}</TableCell>
              <TableCell>{formattedDate(new Date(coupon.toDate))}</TableCell>

              <TableCell>{coupon.active}</TableCell>

              <TableCell>{coupon.discountType}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default CouponsTable;
