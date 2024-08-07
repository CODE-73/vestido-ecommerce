import Image from 'next/image';
import Link from 'next/link';

import { useOrders } from '@vestido-ecommerce/orders';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

type OrdersViewProps = {
  profileId: string;
};

const OrdersView: React.FC<OrdersViewProps> = ({ profileId }) => {
  const { data } = useOrders();
  const orders = data?.data;
  console.log('orderlist', data);

  return (
    <div>
      <div className="font-semibold text-xl my-4">All Orders</div>
      <div className="flex flex-col gap-3">
        {orders?.map((order, index) => (
          <div key={index} className="flex flex-col gap-3">
            {/* <div className="font-semibold text-lg">Order {order.id}</div> */}
            {order.orderItems?.map((orderItem, itemIndex) => (
              <Link key={itemIndex} href={`/products/${orderItem.itemId}`}>
                <div className="p-4 border border-2 flex ">
                  <div className="relative h-24 w-20">
                    <Image
                      className="block col-span-2"
                      src={
                        ((orderItem.item.images ?? []) as ImageSchemaType[])[0]
                          ?.url ?? ''
                      }
                      alt={
                        ((orderItem.item.images ?? []) as ImageSchemaType[])[0]
                          ?.alt ?? ''
                      }
                      fill
                    />
                  </div>

                  <div>{orderItem.item.title}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
