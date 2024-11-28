import { ReactNode, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { useItem } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';
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
    [key: string]: { name: string; values: { value: string; id: string }[] };
  } = {};

  item?.variants.forEach((variant) => {
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
        });
      }
    });
  });

  const handleConfirmSelection = () => {
    onSizeSelect(selectedVariantId); // Pass the selected variant ID to the parent
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        {isDialogOpen && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                <div className="flex">
                  <Image
                    className=" px-2 w-1/5"
                    src={
                      ((item?.images ?? []) as ImageSchemaType[])[0]?.url ?? ''
                    }
                    alt="alt text"
                    width={90}
                    height={115}
                  />
                  <div className="flex flex-col gap-4 ">
                    <div className="font-normal">{item?.title}</div>
                    <div className="flex">
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
              </DialogTitle>
            </DialogHeader>
            <hr />

            <div className="grid grid-cols-4 items-center gap-4 -mt-5">
              <div className="mt-5 flex flex-col gap-2">
                {Object.keys(attributeMap).map((attributeId) => (
                  <>
                    <strong>
                      Select&nbsp;{attributeMap[attributeId].name}:
                    </strong>
                    <div key={attributeId} className="flex gap-2">
                      {attributeMap[attributeId].values.map((value, index) => (
                        <div
                          key={index}
                          onClick={() => changeToVariant(attributeId, value.id)}
                          className={`flex flex-col  rounded-3xl m-1 cursor-pointer ${
                            selectedVariant?.attributeValues.some(
                              (attrVal) =>
                                attrVal.attributeId === attributeId &&
                                attrVal.attributeValue.id === value.id,
                            )
                              ? 'bg-black text-white border-0'
                              : 'border border-2 border-zinc-300 hover:border-black '
                          }`}
                        >
                          <div className="text-sm font-semibold border border-1 border-stone-200 rounded-3xl py-2 px-4 ">
                            {value.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => handleConfirmSelection()}
                className="bg-black w-full text-lg my-1 text-white px-2 py-6 font-bold hover:bg-black rounded-none"
              >
                <div>Confirm</div>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
