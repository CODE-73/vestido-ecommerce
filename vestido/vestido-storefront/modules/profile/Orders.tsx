import { useOrders } from '@vestido-ecommerce/orders/client';

import OrderInOrderList, { OrderinOrderlistSkeleton } from './order';

const OrdersView: React.FC = () => {
  const { data, isLoading } = useOrders();
  const orders = data?.data;

  return (
    <div className="bg-black">
      <h5 className="font-light text-xl my-4 hidden md:block">All Orders</h5>
      <div className="flex flex-col gap-5">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <OrderinOrderlistSkeleton key={index} />)
          : orders?.map((order, index) => {
              return <OrderInOrderList key={index} order={order} />;
            })}
      </div>
    </div>
  );
};

export default OrdersView;
