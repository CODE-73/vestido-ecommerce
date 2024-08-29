import { FC, useEffect, useMemo } from 'react';

import clsx from 'clsx';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { useAttributes } from '@vestido-ecommerce/items/client';
import { Card } from '@vestido-ecommerce/shadcn-ui/card';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';

import { InputElement } from '../../forms/input-element';
import { SelectElement } from '../../forms/select-element';
import { SwitchElement } from '../../forms/switch-element';
import { CreateProductForm, ItemVariantWithSize } from './zod';

const ProductSizeForm: FC<{ className?: string }> = ({ className }) => {
  const form = useFormContext<CreateProductForm>();
  const { fields: sizes } = useFieldArray({
    control: form.control,
    name: 'variants',
  });
  const { data: { data: attributes } = { data: null } } = useAttributes();
  const sizeAttribute = useMemo(
    () =>
      attributes?.find(
        (attribute) => attribute.name.toLowerCase() === 'size',
      ) ?? null,
    [attributes],
  );

  useEffect(() => {
    // This useEffect will sync all the Sizes to the Form
    if (!sizeAttribute) {
      return;
    }

    const variants = form.getValues().variants ?? [];
    const newVariants = sizeAttribute.values.map((size) => {
      const existingVariant = variants.find(
        (variant) => variant.itemAttributeValueId === size.id,
      );
      if (existingVariant) {
        return existingVariant;
      }
      return {
        itemAttributeValueId: size.id,
        enabled: false,
        sku: null,
        stockStatus: 'AVAILABLE',
      } satisfies ItemVariantWithSize;
    });
    form.setValue('variants', newVariants, {
      shouldValidate: true,
    });
  }, [sizeAttribute, form]);

  if (!attributes || !sizeAttribute) {
    return null;
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3',
        className,
      )}
    >
      {sizes.map((size, index) => (
        <Card key={size.itemAttributeValueId} className="p-3">
          <div className="flex justify-between">
            <div className="uppercase">
              {
                sizeAttribute.values.find(
                  (x) => x.id === size.itemAttributeValueId,
                )?.value
              }
            </div>
            <SwitchElement name={`variants.${index}.enabled`} />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Label>Stock</Label>
            <SelectElement
              name={`variants.${index}.stockStatus`}
              options={[
                { title: 'Available', id: 'AVAILABLE' },
                {
                  title: 'Limited Stock',
                  id: 'LIMITED_STOCK',
                },
                {
                  title: 'Out of Stock',
                  id: 'OUT_OF_STOCK',
                },
              ]}
              placeholder="Select Stock Status"
            />
            <InputElement
              name={`variants.${index}.sku`}
              placeholder="SKU"
              label="SKU"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductSizeForm;
