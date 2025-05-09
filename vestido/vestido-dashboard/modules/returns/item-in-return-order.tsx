import Image from 'next/image';

import { useSizeAttribute } from '@vestido-ecommerce/items/client';
import { GetReturnOrderResponse } from '@vestido-ecommerce/orders';
import { TableCell, TableRow } from '@vestido-ecommerce/shadcn-ui/table';
import { formatINR, ImageSchemaType } from '@vestido-ecommerce/utils';

type props = {
  returnItem: NonNullable<GetReturnOrderResponse>['returnItems'][number];
};

const ItemInReturnOrderDetails: React.FC<props> = ({ returnItem }) => {
  const orderItem = returnItem.orderItem;
  const { variantSize } = useSizeAttribute(
    orderItem.itemId,
    orderItem.variantId,
  );
  console.log('variantsize', variantSize);
  return (
    <TableRow className="cursor-pointer">
      <TableCell>
        <Image
          className="w-10 h-12"
          src={((orderItem.item.images ?? []) as ImageSchemaType[])[0].url!}
          alt={((orderItem.item.images ?? []) as ImageSchemaType[])[0].alt!}
          width={50}
          height={70}
        />
      </TableCell>
      <TableCell className="font-semibold capitalize">
        {orderItem.item.title}
      </TableCell>
      <TableCell className="font-semibold capitalize">
        {returnItem.qty}
      </TableCell>
      <TableCell>{formatINR(orderItem.price)}</TableCell>
      <TableCell className="pl-6">{variantSize}</TableCell>
    </TableRow>
  );
};

export default ItemInReturnOrderDetails;
