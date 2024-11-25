import { cva } from 'class-variance-authority';

import { useOrders } from '@vestido-ecommerce/orders/client';
import { formatINR } from '@vestido-ecommerce/utils';

import { checkReturnEligibility } from './check-return-eligibility';
import OrderIteminOrderList from './order-item';

const OrdersView: React.FC = () => {
  const { data } = useOrders();
  const orders = data?.data;

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
    <div className="bg-black">
      <h5 className="font-light text-xl my-4 hidden md:block">All Orders</h5>
      <div className="flex flex-col gap-5">
        {orders?.map((order, index) => {
          const { canBeReturned, returnDeadline } = checkReturnEligibility(
            order.dateTime,
          );
          console.log('fn', canBeReturned, returnDeadline);
          return (
            <div
              key={index}
              className="flex flex-col gap-3 bg-neutral-900  p-2 rounded-lg"
              style={{
                boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)', // Mimicking shadow-lg shadow-gray-700/50
              }}
            >
              <div className="font-semibold my-2 mx-2 grid grid-cols-8 ">
                <div className="col-span-5 flex flex-col">
                  <div>
                    <span className="text-sm font-normal">Order ID:&nbsp;</span>
                    {order.id}
                  </div>
                  <div>
                    <span className="text-sm font-normal">
                      Order Total Price:&nbsp;
                    </span>
                    {formatINR(order.totalPrice)}
                  </div>
                </div>
                <div
                  className={`hidden md:block text-xs uppercase col-span-3 justify-self-end  ${orderStatusClasses(
                    { status: order.orderStatus },
                  )}`}
                >
                  {order.orderStatus}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {order?.orderItems.map((orderItem, index) => (
                  <OrderIteminOrderList key={index} orderItem={orderItem} />
                ))}
              </div>
              {canBeReturned ? (
                <div className="text-xs text-gray-400">
                  Can be returned until {returnDeadline}
                </div>
              ) : (
                <div className="text-xs text-gray-400">
                  Return Window closed on {returnDeadline}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersView;
