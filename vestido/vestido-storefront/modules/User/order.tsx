import { useRouter } from 'next/router';

import { cva } from 'class-variance-authority';

import {
  type ListOrderResponse,
  useOrder,
} from '@vestido-ecommerce/orders/client';
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';
import { formatINR } from '@vestido-ecommerce/utils';

import { checkReturnEligibility } from './check-return-eligibility';
import OrderIteminOrderList from './order-item';

type OrderProps = {
  order: ListOrderResponse['data'][number];
};

const OrderInOrderList: React.FC<OrderProps> = ({ order }) => {
  const { data } = useOrder(order.id);
  const router = useRouter();
  const fulfillments = data?.data?.fulfillments;

  const draftFulfillments = fulfillments?.filter((x) => x.status === 'DRAFT');
  const submittedFulfillments = fulfillments?.filter(
    (x) => x.status != 'DRAFT',
  );

  // Boolean to check if there's at least one submitted fulfillment
  const hasSubmittedFulfillments =
    submittedFulfillments && submittedFulfillments?.length > 0;

  const fulfillmentSubmittedOrderItemIds = new Set(
    submittedFulfillments?.flatMap((fulfillment) =>
      fulfillment.fulfillmentItems.map(
        (fulfillmentItem) => fulfillmentItem.orderItem.id,
      ),
    ) ?? [],
  );

  // Get a set of order item IDs in DRAFT fulfillments
  const draftOrderItemIds = new Set(
    draftFulfillments?.flatMap((fulfillment) =>
      fulfillment.fulfillmentItems.map(
        (fulfillmentItem) => fulfillmentItem.orderItemId,
      ),
    ) ?? [],
  );

  const handleOrderClick = () => {
    router.replace(`/orders/${order.id}`);
  };

  // Combine unfulfilled( fulfillment not submitted) items and items in DRAFT fulfillments
  const unfulfilledOrDraftOrderItems = order.orderItems.filter(
    (orderItem) =>
      !fulfillmentSubmittedOrderItemIds.has(orderItem.id) ||
      draftOrderItemIds.has(orderItem.id),
  );

  const { canBeReturned, returnDeadline } = checkReturnEligibility(
    order.createdAt,
  );

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
                  <OrderIteminOrderList key={index} orderItem={orderItem} />
                ))}
              </div>
             
                <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                 View Order Details
                </div>
            
             
            </div>
  );
};
export default OrderInOrderList;

export const OrderinOrderlistSkeleton = () => {
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
