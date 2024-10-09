import { useRouter } from 'next/router';

import { Coupon } from '@prisma/client';
import { LuTrash } from 'react-icons/lu';

import { useCouponDelete } from '@vestido-ecommerce/coupons/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
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
import { VestidoError } from '@vestido-ecommerce/utils';

import { formattedDate } from '../orders/OrdersTable';

interface CouponTableProps {
  data: Coupon[];
}

const CouponsTable: React.FC<CouponTableProps> = ({ data: coupons }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleRowClick = (couponId: string) => {
    router.push(`/coupons/${encodeURIComponent(couponId)}`);
  };

  const { trigger: deleteCoupon, isMutating: isDeleting } = useCouponDelete();

  const handleCouponDelete = async (couponId: string) => {
    try {
      await deleteCoupon({
        couponId: couponId,
      });
    } catch (e) {
      if (e instanceof VestidoError) {
        toast({
          title: e.name,
          description: e.message,
        });
      } else {
        console.error('Error deleting coupon:', e);
        toast({
          title: 'Error deleting Coupon',
          description: 'Unknown Internal Error',
        });
      }
    }
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
          <TableHead className="text-right">Delete</TableHead>
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
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="bg-transparent text-black hover:text-white"
                      type="button"
                      disabled={isDeleting}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {isDeleting ? 'Deleting...' : <LuTrash />}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this coupon?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCouponDelete(coupon.id);
                        }}
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export default CouponsTable;
