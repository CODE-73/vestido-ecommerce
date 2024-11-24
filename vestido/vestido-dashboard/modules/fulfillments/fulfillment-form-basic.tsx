import { FC } from 'react';

import { InputElement } from '../../forms/input-element';

const BasicFulfillmentForm: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-5 lg:px-10">
      <div className="col-start-1">
        <InputElement
          name="length"
          placeholder="Length of package"
          label="Length"
        />
      </div>
      <InputElement
        name="breadth"
        placeholder="Breadth of package"
        label="Breadth"
      />
      <InputElement
        name="height"
        placeholder="Height of package"
        label="Height"
      />
      <InputElement
        name="weight"
        placeholder="Weight of package"
        label="Weight"
      />
      <InputElement
        name="description"
        placeholder="Add a note on Fulfillment"
        label="Note"
      />
    </div>
  );
};

export default BasicFulfillmentForm;
