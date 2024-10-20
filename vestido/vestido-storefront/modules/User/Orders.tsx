import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAttributes } from '@vestido-ecommerce/items/client';
import { useOrders } from '@vestido-ecommerce/orders/client';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

const OrdersView: React.FC = () => {
  const { data } = useOrders();
  const orders = data?.data;
  const { data: attributeData } = useAttributes();
  const attributes = attributeData?.data;
  const router = useRouter();

  const attr = (attributeId: string) => {
    return attributes?.find((x) => x.id == attributeId);
  };
  const attrValue = (attributeValueId: string) => {
    return attributes
      ?.flatMap((attribute) => attribute.values)
      .find((x) => x.id === attributeValueId);
  };

  const handleOrderClick = (orderId: string) => {
    router.replace(`/orders/${orderId}`);
  };
  return (
    <div className="bg-black">
      <h5 className="font-light text-xl my-4 hidden md:block">All Orders</h5>
      <div className="flex flex-col gap-3">
        {orders?.map((order, index) => (
          <div
            key={index}
            onClick={() => handleOrderClick(order.id)}
            className="flex flex-col gap-3 bg-neutral-900 md:border md:border-2 gap-3"
          >
            <div className="font-semibold mt-8 mx-2">Order ID: {order.id}</div>
            {order.orderItems?.map((orderItem, itemIndex) => {
              const variant = orderItem.item.variants.find(
                (v) => v.id === orderItem.variantId,
              );
              return (
                <div key={itemIndex} className=" md:p-4 ">
                  <div className="hidden md:block font-semibold text-xs uppercase">
                    {order.orderStatus}
                  </div>
                  <Link href={`/products/${orderItem.itemId}`}>
                    <div className="md:hidden font-semibold text-[8px] uppercase">
                      {order.orderStatus}
                    </div>
                    <div className="p-4 border border-2 border-gray-600 flex bg-black gap-3">
                      <div className="relative h-24 w-20">
                        <Image
                          className="block col-span-2"
                          src={
                            (
                              (orderItem.item.images ?? []) as ImageSchemaType[]
                            )[0]?.url ?? ''
                          }
                          alt={
                            (
                              (orderItem.item.images ?? []) as ImageSchemaType[]
                            )[0]?.alt ?? ''
                          }
                          fill
                        />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {orderItem.item.title}
                        </div>
                        {/* <div>{orderItem.variantId}</div> */}

                        <div className=" mt-2">
                          {variant?.attributeValues?.map((value, index) => {
                            const attribute = attr(value.attributeId);
                            const attributeValue = attrValue(
                              value.attributeValueId,
                            );

                            return (
                              <div
                                key={index}
                                className="flex gap-2 capitalize text-sm"
                              >
                                <div>{attribute?.name}&nbsp;:</div>
                                <div className="uppercase">
                                  {attributeValue?.value}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
