import React from 'react';

import { useAttributes } from '@vestido-ecommerce/items/client';
import { Card } from '@vestido-ecommerce/shadcn-ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@vestido-ecommerce/shadcn-ui/select';

import { SwitchElement } from '../../forms/switch-element';

const ProductSizeForm = () => {
  const { data: { data: attributes } = { data: null } } = useAttributes();

  if (!attributes) {
    return null;
  }

  const sizeAttribute = attributes.find(
    (attribute) => attribute.name.toLowerCase() === 'size',
  );

  if (!sizeAttribute) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
      {sizeAttribute.ItemAttributeValues.map((size, index) => (
        <Card key={index} className="p-3">
          <div className="flex justify-between">
            {' '}
            <div className="uppercase"> {size.value}</div>
            <div>
              <SwitchElement name="enabled" />
            </div>
          </div>

          <div className="mt-4">
            {' '}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Stock</SelectLabel>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="LIMITED_STOCK">Limited Stock</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductSizeForm;
