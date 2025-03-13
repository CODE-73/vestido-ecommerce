import { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react';

import clsx from 'clsx';

import { ItemDetails } from '@vestido-ecommerce/items';

type ProductViewVariantsProps = {
  item: ItemDetails;
  selectedVariantId: string | null;
  setSelectedVariantId: Dispatch<SetStateAction<string | null>>;
};

interface AttributeValuesMap {
  [key: string]: string;
}

type VariantAttributeMap = {
  [key: string]: {
    name: string;
    values: {
      value: string;
      displayIdx: number;
      enabled: boolean;
      id: string;
    }[];
  };
};

const ProductViewVariants: FC<ProductViewVariantsProps> = ({
  item,
  selectedVariantId,
  setSelectedVariantId,
}) => {
  const selectedVariant = useMemo(
    () => item?.variants?.find((x) => x.id === selectedVariantId) ?? null,
    [item, selectedVariantId],
  );

  useEffect(() => {
    // Auto Choose the first variant if the item has variants
    if (!item) {
      return;
    }

    if (item.hasVariants) {
      const defaultVar =
        item.variants.find((variant) => variant.default) || item.variants[0];
      setSelectedVariantId(defaultVar?.id ?? null);
    } else {
      setSelectedVariantId(null);
    }
  }, [item, setSelectedVariantId]);

  const attributeMap = useMemo(() => {
    const attributeMap: VariantAttributeMap = {};

    item?.variants
      .filter((x) => x.enabled)
      .forEach((variant) => {
        variant.attributeValues.forEach((attributeValue) => {
          if (!attributeMap[attributeValue.attributeId]) {
            attributeMap[attributeValue.attributeId] = {
              name: attributeValue.attribute.name,
              values: [],
            };
          }
          if (
            !attributeMap[attributeValue.attributeId].values.find(
              (x) => x.id === attributeValue.attributeValue.id,
            )
          ) {
            attributeMap[attributeValue.attributeId].values.push({
              value: attributeValue.attributeValue.value,
              displayIdx: attributeValue.attributeValue.displayIndex,
              id: attributeValue.attributeValue.id,
              enabled:
                variant.enabled && variant.stockStatus !== 'OUT_OF_STOCK',
            });
          }
        });
      });

    for (const attributeId in attributeMap) {
      attributeMap[attributeId].values.sort(
        (a, b) => a.displayIdx - b.displayIdx,
      );
    }

    return attributeMap;
  }, [item?.variants]);

  const currentAttributeValues = useMemo<AttributeValuesMap>(() => {
    if (!selectedVariant) return {};

    return selectedVariant.attributeValues.reduce((acc, attributeValue) => {
      acc[attributeValue.attribute.id] = attributeValue.attributeValue.id;
      return acc;
    }, {} as AttributeValuesMap);
  }, [selectedVariant]);

  const changeToVariant = (attributeId: string, valueId: string) => {
    const values = {
      ...currentAttributeValues,
      [attributeId]: valueId,
    };

    const _v = item?.variants.find((x) =>
      x.attributeValues.every(
        (attrVal) => values[attrVal.attribute.id] === attrVal.attributeValue.id,
      ),
    );

    if (_v) {
      setSelectedVariantId(_v.id);
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      <hr className="border-gray-600" />
      {Object.keys(attributeMap).map((attributeId) => (
        <div key={attributeId} className="flex flex-col items-start gap-[1px] mb-10 md:mb-0">
          <div className="capitalize font-semibold text-md mx-2 my-1">
            {attributeMap[attributeId].name}:
          </div>
          <div className="flex flex-wrap gap-1">
            {attributeMap[attributeId].values.map((value, index) => {
              const isSelected =
                selectedVariant?.attributeValues.some(
                  (attrVal) =>
                    attrVal.attributeId === attributeId &&
                    attrVal.attributeValue.id === value.id,
                ) || false;

              return (
                <div
                  key={index}
                  onClick={() =>
                    value.enabled
                      ? changeToVariant(attributeId, value.id)
                      : null
                  }
                  className={clsx(`border border-2 rounded-3xl m-1 uppercase`, {
                    'cursor-pointer': value.enabled,
                    'bg-white text-black': isSelected,
                    'border-zinc-100 ': !isSelected && value.enabled,
                    'opacity-50': !value.enabled,
                  })}
                >
                  <div className="text-sm font-semibold border border-1 border-stone-200 rounded-3xl py-2 px-4 ">
                    {value.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
};

export default ProductViewVariants;
