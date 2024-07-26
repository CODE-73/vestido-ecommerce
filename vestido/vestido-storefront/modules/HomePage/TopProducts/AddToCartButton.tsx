import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShoppingBag } from 'react-icons/lu';

import { useAddToCart, useItem } from '@vestido-ecommerce/items';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import useIsMobile from '../../../hooks/useIsMobile';

interface AddToCartButtonProps {
  price: number;
  offerPrice: number | null;
  item: Item;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  price,
  offerPrice,
  item,
}) => {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const [qty] = useState(1);
  const { data } = useItem(item.id);
  const product = data?.data;
  const { trigger } = useAddToCart();
  const defaultVar = product?.variants.find((x) => x.default == true);

  const handleAddToCart = () => {
    if (item) {
      trigger({
        itemId: item.id,
        qty: qty,
        variantId: defaultVar?.id ?? product?.variants?.[0]?.id ?? null,
      });
    }
    console.log('added to cart');
  };

  const buttonHeight = '60px'; // Set the desired fixed height
  // console.log(item.discountedPrice);

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex text-xl justify-between w-full pt-3 gap-2">
            {item?.discountPercent && item.discountPercent > 0 ? (
              <div className="flex text-sm items-center gap-2">
                <div className="text-[#48CAB2] font-semibold line-through text-red-400">
                  ₹&nbsp;{item.price.toFixed(2)}
                </div>
                <div className="text-[#48CAB2] text-xl font-bold">
                  ₹&nbsp;{item.discountedPrice?.toFixed(2)}
                </div>
              </div>
            ) : (
              <div className="text-[#48CAB2] font-bold">
                ₹&nbsp;{item.price.toFixed(2)}
              </div>
            )}
          </div>
          <div className={`p-2 bg-[#48CAB2] w-full`}>
            <Button className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2">
              <LuShoppingBag color="#fff" />
              <div> Add to Cart</div>
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="relative flex items-center transition-all justify-start duration-300 bg-white rounded-none hover:bg-[#48CAB2] w-full p-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ height: buttonHeight, minHeight: buttonHeight }}
          onClick={() => handleAddToCart()}
        >
          <div
            className={`flex items-center justify-start gap-3 transition-all duration-300 bg-[#48CAB2] p-4 ${
              hovered ? 'w-full' : ''
            }`}
            style={{ height: '100%' }}
          >
            <LuShoppingBag className="text-white" size={24} />
            {hovered && (
              <span className="ml-2 text-white text-lg font-semibold">
                ADD TO CART
              </span>
            )}
          </div>
          {!hovered && (
            <div className="ml-4 font-semibold text-left flex-grow">
              <div className="flex gap-4 items-center">
                <div
                  className={`text-gray-500 ${
                    offerPrice && offerPrice < price
                      ? 'line-through'
                      : 'text-lg'
                  }`}
                >
                  ₹&nbsp;{price.toFixed(2)}
                </div>
                {offerPrice ? (
                  <div className="text-black text-lg">
                    ₹&nbsp;{offerPrice.toFixed(2)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
