import Image from 'next/image';
import Link from 'next/link';

import { useAttributes } from '@vestido-ecommerce/items';
import { useOrders } from '@vestido-ecommerce/orders';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

type OrdersViewProps = {
  profileId: string;
};

const OrdersView: React.FC<OrdersViewProps> = ({ profileId }) => {
  const { data } = useOrders();
  const orders = data?.data;
  console.log('orderlist', data);
  const { data: attributeData } = useAttributes();
  const attributes = attributeData?.data;

  const attr = (attributeId: string) => {
    return attributes?.find((x) => x.id == attributeId);
  };
  const attrValue = (attributeValueId: string) => {
    return attributes
      ?.flatMap((attribute) => attribute.ItemAttributeValues)
      .find((x) => x.id === attributeValueId);
  };

  return (
    <div>
      <div className="font-semibold text-xl my-4">All Orders</div>
      <div className="flex flex-col gap-3">
        {orders?.map((order, index) => (
          <div key={index} className="flex flex-col gap-3">
            {order.orderItems?.map((orderItem, itemIndex) => {
              console.log('orderItem', orderItem);
              const variant = orderItem.item.variants.find(
                (v) => v.id === orderItem.variantId,
              );
              return (
                <div key={itemIndex} className="p-4 border border-2 gap-3">
                  <div className="font-semibold text-xs lowercase">
                    {order.status}
                  </div>
                  <Link href={`/products/${orderItem.itemId}`}>
                    <div className="p-4 border border-2 flex bg-stone-200 gap-3">
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
                            console.log('attrvalue', attributeValue);

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
