import { useSizeAttribute } from '@vestido-ecommerce/items/client';
import { FulfillmentDetailsResponse } from '@vestido-ecommerce/orders/client';
import { TableCell } from '@vestido-ecommerce/shadcn-ui/table';
import { formatINR } from '@vestido-ecommerce/utils';

import { UpdateFulfillmentForm } from './FulfillmentForm';

type props = {
  _fulfillmentItem: UpdateFulfillmentForm['items'][number];
  fulfillment: FulfillmentDetailsResponse['data'] | null;
};

const FulfillmentItemSizePrice: React.FC<props> = ({
  _fulfillmentItem,
  fulfillment,
}) => {
  const fulfillmentItem = fulfillment?.fulfillmentItems.find(
    (x) => x.id === _fulfillmentItem.id,
  );

  const variantId = fulfillmentItem?.orderItem.variantId;

  const { variantSize } = useSizeAttribute(fulfillmentItem?.id, variantId);
  console.log('variantsize', variantSize);
  return (
    <>
      <TableCell className="pl-6">{variantSize}</TableCell>
      <TableCell className="pl-6">
        {formatINR(fulfillmentItem?.orderItem.price ?? 0)}
      </TableCell>
    </>
  );
};

export default FulfillmentItemSizePrice;
