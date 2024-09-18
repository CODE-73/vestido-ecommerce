import * as React from 'react';
import { useMemo, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { LuCalendar, LuScaling, LuShoppingBag, LuTruck } from 'react-icons/lu';
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

import AddToWishListButton from '../ProductListView/AddToWishlistButton';
import ProductListView from '../ProductListView/ProductListView';
import ProductViewBreadcrumb from './poduct-view-breadcrumpts';
import ProductViewImages from './product-view-images';
import ProductViewVariants from './product-view-variants';

interface ProductViewProps {
  itemId: string;
}

const ProductView: React.FC<ProductViewProps> = ({ itemId }) => {
  const { isAuthenticated, routeToLogin } = useAuth();

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

  const handleAddToCart = () => {
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
    }
  };

  const isMdAndAbove = useMediaQuery('(min-width:768px)');

  if (!item || !category) {
    return null;
  }

  return (
    <>
      <ProductViewBreadcrumb item={item} category={category} />
      <div className="w-full flex flex-col md:flex-row py-5 sm:px-2 md:px-0 md:space-x-10 md:px-10 lg:px-20 xl:px-64 text-white">
        <ProductViewImages item={item} selectedVariantId={selectedVariantId} />
        <div className="w-full md:w-1/2">
          <div className="px-2 sm:px-auto">
            <h1 className="text-xl md:text-3xl font-semibold mt-2 md:mt-5 lg:mt-auto">
              {item?.title}
            </h1>
            <div className="flex flex-row items-center gap-1">
              <div className="text-2xl text-gray-500 md:text-black mt-5 md:mt-0 font-semibold">
                ₹&nbsp;
                {item?.discountedPrice && item?.discountedPrice > 0
                  ? item?.discountedPrice.toFixed(2)
                  : item?.price.toFixed(2)}
              </div>
            </div>

            <div className="text-sm mt-4">
              <div className="flex">
                <h1 className="font-extralight">Availability:&nbsp; </h1>
                <h1
                  className={`font-semibold ${item?.stockStatus == 'LIMITED_STOCK' ? 'text-yellow-400' : item?.stockStatus === 'OUT_OF_STOCK' ? 'text-red-400' : 'text-green-500'}`}
                >
                  {item?.stockStatus === 'LIMITED_STOCK'
                    ? 'Limited Stock'
                    : item?.stockStatus === 'OUT_OF_STOCK'
                      ? 'Out of Stock'
                      : 'Available'}
                </h1>
              </div>

              <div className="flex gap-2">
                <h1 className="font-extralight">Category</h1>
                <h1 className="font-semibold no-underline hover:underline">
                  {category?.name}
                </h1>
              </div>

              <div className="flex gap-2">
                <h1 className="font-extralight">SKU: </h1>
                <h1 className="font-semibold no-underline hover:underline">
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

            <hr className="border-gray-600" />
          </div>
          <div
            className="flex gap-2 mb-5 w-full fixed -bottom-5 w-full sm:static bg-black  py-4 px-2 mx-0 z-50 sm:z-auto"
            style={{
              boxShadow: '0 -20px 25px -5px rgba(55, 65, 81, 0.3)', // Mimicking shadow-lg shadow-gray-700/50
            }}
          >
            <div className="flex bg-[#48CAB2] items-center gap-2 flex-1 justify-center text-white  ">
              <LuShoppingBag size={30} />
              <Button
                onClick={() => handleAddToCart()}
                className="text-xl font-semibold bg-transparent hover:bg-transparent"
              >
                ADD TO CART
              </Button>
            </div>
            <div className="flex bg-[#48CAB2] items-center gap-2 flex-1 justify-center text-white  ">
              <Button
                // onClick={() => handleAddToCart()}
                className="text-xl font-semibold bg-transparent hover:bg-transparent"
              >
                BUY NOW
              </Button>
            </div>
            <AddToWishListButton
              itemId={item?.id || ''}
              className="border border-2 border-[#48CAB2] font-medium text-xs  h-full self-center p-4"
            />
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between py-5 px-1 sm:px-0">
            {isMdAndAbove ? (
              <>
                <div className="flex flex-col  gap-1 items-center">
                  <LuScaling size={28} style={{ strokeWidth: 0.5 }} />
                  <div>Size Guide</div>
                </div>
                <div className="flex  flex-col  gap-1 items-center">
                  <LuCalendar size={28} style={{ strokeWidth: 0.5 }} />
                  <div>7 Days Easy Return</div>
                </div>
                <div className="flex  flex-col  gap-1 items-center">
                  <LuTruck size={30} style={{ strokeWidth: 0.5 }} />
                  <div>
                    Free Shipping in Kerala
                    <div className="text-[10px] text-center">(Prepaid)</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-3">
                <div className="flex flex-col  gap-1 items-center ">
                  <LuScaling size={24} />
                  <div className="text-xs">Size Guide</div>
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
            )}
          </div>
          <hr className="border-gray-600" />
          <div>
            <Accordion className="px-2" type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger>Description</AccordionTrigger>
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
