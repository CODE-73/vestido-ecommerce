import { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { useTaxes } from '@vestido-ecommerce/tax/client';

import { CheckBoxElement } from '../../forms/checkbox-element';
import { InputElement } from '../../forms/input-element';
import { SelectElement } from '../../forms/select-element';
import { CreateProductForm } from './zod';

const ProductFormTaxItem: FC = () => {
  const form = useFormContext<CreateProductForm>();
  const { data: { data: taxes } = { data: null } } = useTaxes();

  const handleTaxSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTaxTitle = event.target.value;
    const selectedTax = taxes?.find((tax) => tax.title === selectedTaxTitle);
    if (selectedTax) {
      form.setValue('taxRate', selectedTax.rate);
      form.setValue('taxTitle', selectedTax.title);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-5 lg:px-10 mt-10 items-center">
      {taxes && (
        <>
          <SelectElement
            options={taxes.map((tax) => ({ title: tax.title, id: tax.title }))}
            placeholder="Select Tax"
            label="Tax Details"
            {...form.register('taxTitle', {
              onChange: (event) => {
                handleTaxSelection(event);
              },
            })}
          />
          <InputElement label="Tax Rate" name="taxRate" readOnly />
        </>
      )}
      <div className="self-center mt-3">
        <CheckBoxElement name="taxInclusive" label="Tax Inclusive" />
      </div>
    </div>
  );
};

export default ProductFormTaxItem;
