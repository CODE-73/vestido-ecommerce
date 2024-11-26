import { useOrders } from '@vestido-ecommerce/orders/client';

import OrderInOrderList from './order';

const OrdersView: React.FC = () => {
  const { data } = useOrders();
  const orders = data?.data;

  return (
    <div className="bg-black">
      <h5 className="font-light text-xl my-4 hidden md:block">All Orders</h5>
      <div className="flex flex-col gap-5">
        {orders?.map((order, index) => {
          return <OrderInOrderList key={index} order={order} />;
        })}
      </div>
    </div>
  );
};

export default OrdersView;
