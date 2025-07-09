import * as React from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { LuCalendar, LuShoppingBag, LuTruck } from 'react-icons/lu';
import Markdown from 'react-markdown';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  useAddToCart,
  useCategory,
  useItem,
} from '@vestido-ecommerce/items/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@vestido-ecommerce/shadcn-ui/accordion';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import AddToWishListButton from '../ProductListView/AddToWishlistButton';
import ProductListView from '../ProductListView/ProductListView';
import { SizeSelectorDialog } from '../Wishlist/size-selector';
import ProductViewImages from './product-view-images';
import ProductViewVariants from './product-view-variants';
import SizeGuide from './size-guide-component';

interface ProductViewProps {
  itemId: string;
}

const ProductView: React.FC<ProductViewProps> = ({ itemId }) => {
  const { isAuthenticated, routeToLogin, authLoaded } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const { data: { data: item } = { data: null } } = useItem(itemId);

  const { data: { data: category } = { data: null } } = useCategory(
    item?.categoryId,
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const selectedVariant = useMemo(
    () => item?.variants?.find((x) => x.id === selectedVariantId) ?? null,
    [item, selectedVariantId],
  );

  const { trigger: cartTrigger } = useAddToCart();

  const handleAddToCart = (selectedVariantId: string | null) => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }
    if (item) {
      cartTrigger({
        itemId: item.id,
        qty: 1,
        variantId: selectedVariantId ?? null,
      });
      toast({
        title: 'Item Added to Cart!',
      });
    }
  };
  const handleBuyNow = (selectedVariantId: string | null) => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
      router.push(
        `/checkout?buyNowItemId=${item.id}&buyNowVariantId=${selectedVariantId}`,
      );
    }
  };

  if (!item || !category) {
    return null;
  }

  return (
    <>
      {/* <ProductViewBreadcrumb item={item} category={category} /> */}
      <div className="w-full flex flex-col md:flex-row pb-5 sm:px-2 md:px-0 md:space-x-10 md:px-10 lg:px-20 xl:px-64 text-white mt-12 md:mt-5">
        <ProductViewImages item={item} selectedVariantId={selectedVariantId} />
        <div className="w-full md:w-1/2">
          <div className="px-2 sm:px-auto">
            <h1 className="text-xl md:text-3xl font-semibold mt-5 sm:mt-2  md:mt-5 lg:mt-auto">
              {item?.title}
            </h1>
            <div className="flex flex-row items-center gap-1">
              <div className="text-2xl text-white mt-5 md:mt-0 font-semibold">
                {item?.discountedPrice && item?.discountedPrice < item.price ? (
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
                    <div className="text-white">
                      {formatINR(item?.discountedPrice)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-[0.5] md:items-center">
                      <div className="font-light text-lg line-through">
                        {formatINR(item?.price)}
                      </div>
                      <div className="text-xs text-red-400 md:mt-1">
                        ({formatINR(item.price - item.discountedPrice)}
                        &nbsp; OFF)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>{formatINR(item?.price)}</div>
                )}
              </div>
            </div>
            {item.taxInclusive && <div>inclusive of all taxes</div>}

            <div className="text-sm mt-4">
              <h1
                className={`font-semibold sm:mb-2 ${item?.stockStatus == 'LIMITED_STOCK' ? 'text-red-400' : item?.stockStatus === 'OUT_OF_STOCK' ? 'text-white' : 'text-[#48CAB2]'}`}
              >
                {item?.stockStatus === 'LIMITED_STOCK'
                  ? 'Limited Stock'
                  : item?.stockStatus === 'OUT_OF_STOCK'
                    ? 'Out of Stock'
                    : 'Available'}
              </h1>

              <div className="flex gap-2">
                <h1 className="font-extralight">Category:&nbsp;</h1>
                <h1 className="font-semibold no-underline">{category?.name}</h1>
              </div>

              <div className="flex gap-2">
                <h1 className="font-extralight">SKU: </h1>
                <h1 className="font-semibold no-underline text-gray-300">
                  {item?.variants?.length && item?.variants?.length > 0
                    ? selectedVariant?.sku
                    : item?.sku}
                </h1>
              </div>

              <ProductViewVariants
                item={item}
                selectedVariantId={selectedVariantId}
                setSelectedVariantId={setSelectedVariantId}
              />
            </div>
          </div>
          <div className="sm:hidden md:block lg:hidden -mt-7 md:mt-2">
            {' '}
            <SizeGuide itemId={itemId} IsSmallScreen />
          </div>
          <div
            className="flex gap-2 mb-5 md:mb-0 md:my-5 w-full bg-black  py-2 px-2 mx-0 mt-5 sm:mt-0"
            style={{
              boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)', // Mimicking shadow-lg shadow-gray-700/50
            }}
          >
            <SizeSelectorDialog
              itemId={item.id}
              onSizeSelect={(variantId) => {
                if (!variantId) {
                  toast({
                    title: 'Error',
                    description: 'Please select a valid size.',
                  });
                  return;
                }

                handleAddToCart(variantId);
              }}
            >
              <Button
                disabled={!authLoaded}
                className="text-sm md:text-xl font-semibold bg-transparent hover:bg-transparent h-10 sm:h-auto flex gap-1 border border-white  flex-1"
              >
                <LuShoppingBag className="h-4 w-4 md:h-8 md:w-8" />
                <div>ADD TO CART</div>
              </Button>
            </SizeSelectorDialog>

            <SizeSelectorDialog
              itemId={item.id}
              onSizeSelect={(variantId) => {
                if (!variantId) {
                  toast({
                    title: 'Error',
                    description: 'Please select a valid size.',
                  });
                  return;
                }
                handleBuyNow(variantId);
              }}
            >
              <Button
                disabled={!authLoaded}
                className="text-sm md:text-xl text-black bg-[#f8f8f8] font-semibold h-10 sm:h-auto flex-1 hover:bg-white"
              >
                BUY NOW
              </Button>
            </SizeSelectorDialog>
            <AddToWishListButton
              itemId={item?.id || ''}
              size={28}
              className="hidden sm:block sm:border sm:border-2 rounded-full sm:rounded-lg font-medium text-xs h-full self-center p-1 sm:p-4  md:p-1 2xl:p-4 "
              color="white"
            />
          </div>

          <div className="flex justify-between py-5 px-1 sm:px-0 this">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full">
              <div className="hidden sm:block md:hidden lg:block">
                <SizeGuide itemId={itemId} />
              </div>

              <div className="flex  flex-col  justify-center gap-1 items-center ">
                <LuCalendar size={24} />
                <div className="text-xs text-center">7 Days Easy Return</div>
              </div>
              <div className="flex  flex-col  gap-1 items-center ">
                <LuTruck size={26} />
                <div className="text-xs text-center">
                  Free Shipping in Kerala
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-600" />
          <div>
            <Accordion className="px-2" type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent>
                  <Markdown className="prose prose-invert text-white text-sm md:text-base">
                    {item?.description}
                  </Markdown>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <hr className="border-gray-600" />
          </div>
        </div>
      </div>

      <div>
        <div className="text-center text-xl md:text-3xl font-semibold pt-10 sm:pt-16 -mb-10 text-white">
          You may also like
        </div>
        {category && (
          <ProductListView categoryId={category.id} suggestedList={true} />
        )}
      </div>
    </>
  );
};

export default ProductView;
