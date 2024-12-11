import { Item } from '@prisma/client';

import { useSizeAttribute } from '@vestido-ecommerce/items/client';
import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';

type orderItemProps = {
  // orderItem: ListOrderResponse['data'][number]['orderItems'][number];
  orderitem_itemid: string;
  orderitem_variantid: string;
  orderitem_item: Item;
  orderitem_qty: number;
};

const OrderIteminOrderList: React.FC<orderItemProps> = ({
  orderitem_itemid,
  orderitem_variantid,
  orderitem_item,
  orderitem_qty,
}) => {
  const { variantSize } = useSizeAttribute(
    orderitem_itemid,
    orderitem_variantid,
  );

  return (
    <div className="py-3 flex gap-4 bg-black rounded-lg">
      <ItemImage
        item={orderitem_item}
        width={60}
        height={90}
        className=" justify-self-center rounded-lg ml-4"
      />
      <div className="flex flex-col">
        <div className=" pl-1 text-sm font-semibold ">
          {orderitem_item.title}
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Qty:</div>
          {orderitem_qty}
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Size:</div>
          <div className="uppercase">{variantSize}</div>
        </div>
        <div className="px-1 text-sm flex gap-4">
          <div>Price:</div>
          <div className="uppercase font-semibold">
            {formatINR(
              orderitem_item.discountedPrice
                ? orderitem_item.discountedPrice
                : orderitem_item.price,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderIteminOrderList;
