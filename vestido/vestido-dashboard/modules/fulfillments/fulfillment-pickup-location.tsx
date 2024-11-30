import { FC } from 'react';

import { usePickupLoc } from '@vestido-ecommerce/orders/client';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';

import { SelectElement } from '../../forms/select-element';

type FulfillmentPickupLocationProps = {
  name: string;
};

const FulfillmentPickupLocation: FC<FulfillmentPickupLocationProps> = ({
  name,
}) => {
  const { data: { data } = { data: [] }, isLoading } = usePickupLoc();

  return (
    <div className="flex flex-col">
      <Label>Pickup Location</Label>
      <SelectElement
        name={name}
        options={(data || []).map((loc) => ({ title: loc, id: loc }))}
        disabled={isLoading}
      ></SelectElement>
    </div>
  );
};

export default FulfillmentPickupLocation;
