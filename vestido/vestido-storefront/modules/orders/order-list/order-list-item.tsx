import { useRouter } from 'next/router';

import { cva } from 'class-variance-authority';

import { type ListOrderResponse } from '@vestido-ecommerce/orders/client';
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';
import { formatINR } from '@vestido-ecommerce/utils';

import OrderListItemOrderItem from './order-list-item-order-item';

type OrderProps = {
  order: ListOrderResponse['data'][number];
};

const OrderListItem: React.FC<OrderProps> = ({ order }) => {
  const router = useRouter();

  const handleOrderClick = () => {
    router.replace(`/orders/${order.id}`);
  };

  const orderStatusClasses = cva(
    'font-semibold text-xs uppercase py-1 rounded-full',
    {
      variants: {
        status: {
          PENDING: 'text-orange-600',
          CONFIRMED: 'text-yellow-600 ',
          CANCELLED: 'text-red-600',
          IN_PROGRESS: 'text-blue-600',
          COMPLETED: 'text-green-600 ',
        },
      },
      defaultVariants: {
        status: 'PENDING',
      },
    },
  );

  return (
    <div
      className="flex flex-col gap-3 bg-neutral-900  p-2 rounded-lg cursor-pointer"
      style={{
        boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)', // Mimicking shadow-lg shadow-gray-700/50
      }}
      onClick={() => handleOrderClick()}
    >
      <div className="font-semibold my-2 mx-2 grid grid-cols-5 sm:grid-cols-8">
        <div className="col-span-5 flex flex-col">
          <div>
            <span className=" font-normal">Order </span>
            <span className="text-xl font-semibold">
              #{order.order_no.toString()}
            </span>
          </div>
          <div>
            <span className="text-sm font-normal">
              Order Total Price:&nbsp;
            </span>
            {formatINR(order.grandTotal)}
          </div>
        </div>
        <div
          className={`md:block text-xs uppercase col-span-3 sm:justify-self-end  ${orderStatusClasses(
            { status: order.orderStatus },
          )}`}
        >
          {order.orderStatus.replace(/_/g, ' ').toLowerCase()}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {order?.orderItems.map((orderItem, index) => (
          <OrderListItemOrderItem key={index} orderItem={orderItem} />
        ))}
      </div>

      <div className="text-xs text-gray-400 cursor-pointer hover:underline">
        View Order Details
      </div>
    </div>
  );
};
export default OrderListItem;

export const OrderListItemSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-3 bg-neutral-900  p-2 rounded-lg cursor-pointer"
      style={{
        boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)',
      }}
    >
      <Skeleton className="bg-neutral-700 w-[300px] h-[20px] rounded-full" />
      <Skeleton className="bg-neutral-700 w-[150px] h-[10px]" />

      <div className="py-3 flex gap-4 bg-black rounded-lg">
        <Skeleton className=" justify-self-center bg-neutral-800 rounded-lg ml-4 w-[60px] h-[90px]" />
        <div className="flex flex-col gap-3">
          <Skeleton className="bg-neutral-700 w-[300px] h-[20px] rounded-full" />

          <Skeleton className="bg-neutral-700 w-[100px] h-[10px]" />

          <Skeleton className="bg-neutral-700 w-[100px] h-[10px]" />
        </div>
      </div>
    </div>
  );
};
