import { useSizeAttribute } from '@vestido-ecommerce/items/client';
import { FulfillmentDetailsResponse } from '@vestido-ecommerce/orders/client';
import { TableCell } from '@vestido-ecommerce/shadcn-ui/table';

import { UpdateFulfillmentForm } from './FulfillmentForm';

type props = {
  _fulfillmentItem: UpdateFulfillmentForm['items'][number];
  fulfillment: FulfillmentDetailsResponse['data'] | null;
};

const FulfillmentItemSize: React.FC<props> = ({
  _fulfillmentItem,
  fulfillment,
}) => {
  const fulfillmentItem = fulfillment?.fulfillmentItems.find(
    (x) => x.id === _fulfillmentItem.id,
  );

  const variantId = fulfillmentItem?.orderItem.variantId;

  const { variantSize } = useSizeAttribute(fulfillmentItem?.id, variantId);
  console.log('variantsize', variantSize);
  return <TableCell className="pl-6">{variantSize}</TableCell>;
};

export default FulfillmentItemSize;
