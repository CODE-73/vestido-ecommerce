import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTaxes } from '@vestido-ecommerce/tax/client';

import { SelectElement } from '../../forms/select-element';
import { CreateProductForm } from './zod';

const ProductFormTaxItem: FC = () => {
  const form = useFormContext<CreateProductForm>();

  const { data } = useTaxes();
  console.log('taxes', data);

  return (
    <div>
      <SelectElement
        name="taxTitle"
        options={[
          { title: 'tax1', id: 'TAX_1' },
          { title: 'tax2', id: 'TAX_2' },
        ]}
        placeholder="Select Tax"
      ></SelectElement>
    </div>
  );
};

export default ProductFormTaxItem;
