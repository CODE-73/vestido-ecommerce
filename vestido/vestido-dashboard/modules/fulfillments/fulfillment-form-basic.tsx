import { FC } from 'react';

import { InputElement } from '../../forms/input-element';
import FulfillmentPickupLocation from './fulfillment-pickup-location';

const BasicFulfillmentForm: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-5 lg:px-10">
      <div className="col-start-1">
        <InputElement
          name="length"
          placeholder="Length of package"
          label="Length(cm)"
        />
      </div>
      <InputElement
        name="breadth"
        placeholder="Breadth of package"
        label="Breadth(cm)"
      />
      <InputElement
        name="height"
        placeholder="Height of package"
        label="Height(cm)"
      />
      <InputElement
        name="weight"
        placeholder="Weight of package"
        label="Weight(kg)"
      />
      <InputElement
        name="description"
        placeholder="Add a note on Fulfillment"
        label="Note"
      />
      <FulfillmentPickupLocation name="pickup_location" />
    </div>
  );
};

export default BasicFulfillmentForm;
