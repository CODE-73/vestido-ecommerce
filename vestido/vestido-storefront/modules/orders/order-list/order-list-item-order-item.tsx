import { useSizeAttribute } from '@vestido-ecommerce/items/client';
import { type ListOrderResponse } from '@vestido-ecommerce/orders/client';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../../components/item-image';

type orderItemProps = {
  orderItem: ListOrderResponse['data'][number]['orderItems'][number];
};

const OrderListItemOrderItem: React.FC<orderItemProps> = ({ orderItem }) => {
  const { variantSize } = useSizeAttribute(
    orderItem.itemId,
    orderItem.variantId,
  );

  return (
    <div className="py-3 flex gap-4 bg-black rounded-lg">
      <ItemImage
        item={orderItem.item}
        width={60}
        height={90}
        className=" justify-self-center rounded-lg ml-4"
      />
      <div className="flex flex-col">
        <div className=" pl-1 text-sm font-semibold ">
          {orderItem.item.title}
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Qty:</div>
          {orderItem.qty}
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Size:</div>
          <div className="uppercase">{variantSize}</div>
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Price:</div>
          <div className="uppercase font-semibold">
            {formatINR(
              orderItem.item.discountedPrice
                ? orderItem.item.discountedPrice
                : orderItem.item.price,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListItemOrderItem;
