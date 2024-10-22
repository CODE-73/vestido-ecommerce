import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { LuShoppingBag } from 'react-icons/lu';

import {
  useAddToCart,
  useItem,
  useRemoveFromWishlist,
} from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { ItemToastBody } from '../../components/item-toast-body';

type AddToCartDialogProps = {
  itemId: string;
};
export const AddToCartDialog: React.FC<AddToCartDialogProps> = ({ itemId }) => {
  const { data } = useItem(itemId);
  const { trigger: wishlistTrigger } = useRemoveFromWishlist();

  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const item = data?.data;
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const { toast } = useToast();

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

  const { trigger: cartTrigger } = useAddToCart();

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

  const handleRemoveFromWishlist = (itemId: string) => {
    wishlistTrigger({
      itemId: itemId,
    });
  };

  const handleAddToCart = () => {
    if (item) {
      cartTrigger({
        itemId: item.id,
        qty: 1,
        variantId: selectedVariantId ?? null,
      });
      toast({
        description: ItemToastBody(true, item, 'Moved to Cart!'),
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
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
                    ₹&nbsp;
                    {item?.discountedPrice?.toFixed(2) ??
                      item?.price.toFixed(2)}
                    {item?.discountedPrice &&
                      item?.discountedPrice < item?.price &&
                      item?.discountedPrice > 0 && (
                        <div className="font-normal line-through text-sm">
                          ₹&nbsp;{item.price.toFixed(2)}
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
                  <strong>Select&nbsp;{attributeMap[attributeId].name}:</strong>
                  <div key={attributeId} className="flex gap-2">
                    {attributeMap[attributeId].values.map((value, index) => (
                      <div
                        key={index}
                        onClick={() => changeToVariant(attributeId, value.id)}
                        className={`flex flex-col border border-2 rounded-3xl m-1 cursor-pointer ${
                          selectedVariant?.attributeValues.some(
                            (attrVal) =>
                              attrVal.attributeId === attributeId &&
                              attrVal.attributeValue.id === value.id,
                          )
                            ? 'border-[#48CAB2] text-[#48CAB2] '
                            : 'border-zinc-100 hover:border-[#48CAB2] hover:text-[#48CAB2]'
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
              onClick={() => {
                handleRemoveFromWishlist(itemId);
                handleAddToCart();
              }}
              className="bg-[#48CAB2] w-full flex gap-3 text-lg my-1 text-white px-2 py-6 font-bold hover:bg-[#48CAB2] rounded-none"
            >
              <LuShoppingBag color="#fff" size={24} />
              <div> Add to Cart</div>
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </>
  );
};
