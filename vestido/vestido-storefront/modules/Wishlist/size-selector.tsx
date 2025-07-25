import { ReactNode, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useItem } from '@vestido-ecommerce/items/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { formatINR, ImageSchemaType } from '@vestido-ecommerce/utils';

type SizeSelectorDialogProps = {
  itemId: string;
  onSizeSelect: (variantId: string | null) => void;
  children: ReactNode;
};
export const SizeSelectorDialog: React.FC<SizeSelectorDialogProps> = ({
  itemId,
  onSizeSelect,
  children,
}) => {
  const { data } = useItem(itemId);

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const item = data?.data;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const selectedVariant = useMemo(
    () => item?.variants?.find((x) => x.id === selectedVariantId) ?? null,
    [item, selectedVariantId],
  );

  useEffect(() => {
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
  }, [item]);
  interface AttributeValuesMap {
    [key: string]: string;
  }

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

  const attributeMap: {
    [key: string]: {
      name: string;
      values: {
        value: string;
        id: string;
        displayIdx: number;
        enabled: boolean;
      }[];
    };
  } = {};

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
            id: attributeValue.attributeValue.id,
            displayIdx: attributeValue.attributeValue.displayIndex,
            enabled: variant.enabled && variant.stockStatus !== 'OUT_OF_STOCK',
          });
        }
      });
    });

  for (const attributeId in attributeMap) {
    attributeMap[attributeId].values.sort(
      (a, b) => a.displayIdx - b.displayIdx,
    );
  }

  const handleConfirmSelection = () => {
    onSizeSelect(selectedVariantId); // Pass the selected variant ID to the parent
    setIsDialogOpen(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

        {isDialogOpen && (
          <AlertDialogContent className="w-[98%] flex justify-center mx-auto rounded-lg sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className="flex">
                    <Image
                      className=" px-2 w-1/5"
                      src={
                        ((item?.images ?? []) as ImageSchemaType[])[0]?.url ??
                        ''
                      }
                      alt="alt text"
                      width={90}
                      height={115}
                    />
                    <div className="flex flex-col gap-4 ">
                      <div className="font-normal">{item?.title}</div>
                      <div className="flex gap-2 items-center">
                        {formatINR(
                          item?.discountedPrice ?? (item?.price as number),
                        )}

                        {item?.discountedPrice &&
                          item?.discountedPrice < item?.price &&
                          item?.discountedPrice > 0 && (
                            <div className="font-normal line-through text-sm">
                              {formatINR(item.price)}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </AlertDialogTitle>
              </AlertDialogHeader>
              <hr />
              <strong className="mt-8 text-[12px] sm:text-base">
                Select Size
              </strong>
              <div className="grid items-center gap-4 -mt-5 justify-center">
                <div className="mt-5 flex flex-col gap-2">
                  {Object.keys(attributeMap).map((attributeId) => (
                    <>
                      <div key={attributeId} className="flex flex-wrap gap-2">
                        {attributeMap[attributeId].values.map(
                          (value, index) => {
                            const isSelected =
                              selectedVariant?.attributeValues.some(
                                (attrVal) =>
                                  attrVal.attributeId === attributeId &&
                                  attrVal.attributeValueId === value.id,
                              );

                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  value.enabled
                                    ? changeToVariant(attributeId, value.id)
                                    : null
                                }
                                className={clsx(
                                  `border border-2 rounded-3xl m-1 uppercase`,
                                  {
                                    'cursor-pointer': value.enabled,
                                    'bg-black text-white': isSelected,
                                    'border-zinc-100 ':
                                      !isSelected && value.enabled,
                                    'opacity-50': !value.enabled,
                                  },
                                )}
                              >
                                <div className="text-sm font-semibold border border-1 border-stone-200 rounded-3xl py-2 px-4 ">
                                  {value.value}
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <AlertDialogFooter className="grid grid-cols-2 gap-2 mt-8">
                <AlertDialogCancel className="border-black mt-0 bg-transparent text-black">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => handleConfirmSelection()}
                  className="bg-black"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </motion.div>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
};
