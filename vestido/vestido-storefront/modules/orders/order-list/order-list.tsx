import { useOrders } from '@vestido-ecommerce/orders/client';

import OrderListItem, { OrderListItemSkeleton } from './order-list-item';

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
              .map((_, index) => <OrderListItemSkeleton key={index} />)
          : orders?.map((order, index) => {
              return <OrderListItem key={index} order={order} />;
            })}
      </div>
    </div>
  );
};

export default OrdersView;
