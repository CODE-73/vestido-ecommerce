import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShoppingBag } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useAddToCart, useItem } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
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
  const { isAuthenticated, routeToLogin } = useAuth();
  const [hovered, setHovered] = useState(false);
  const [qty] = useState(1);
  const { data } = useItem(item.id);
  const product = data?.data;
  const { trigger } = useAddToCart();
  const defaultVar = product?.variants.find((x) => x.default == true);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
      trigger({
        itemId: item.id,
        qty: qty,
        variantId: defaultVar?.id ?? product?.variants?.[0]?.id ?? null,
      });
    }
  };

  const buttonHeight = '40px';
  return (
    <>
      <Button
        className="relative flex items-center transition-all justify-start duration-300 bg-white rounded-none hover:bg-[#48CAB2] w-full p-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ height: buttonHeight, minHeight: buttonHeight }}
        onClick={() => handleAddToCart()}
      >
        <div
          className={`flex items-center justify-start gap-3 transition-all duration-300 bg-[#48CAB2] p-2 ${
            hovered ? 'w-full' : ''
          }`}
          style={{ height: '100%' }}
        >
          <LuShoppingBag className="text-white" size={20} />
          {hovered && (
            <span className="ml-2 text-white text-lg font-semibold">
              ADD TO CART
            </span>
          )}
        </div>
        {!hovered && (
          <div className="ml-4 font-semibold text-left flex-grow ">
            {offerPrice ? (
              <div className="flex items-baseline gap-1">
                <div className="text-black text-base">
                  ₹&nbsp;{offerPrice.toFixed(2)}
                </div>
                {offerPrice < price ? (
                  <div className="text-gray-500 line-through text-xs">
                    ₹&nbsp;{price.toFixed(2)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div className="text-black text-base">
                ₹&nbsp;{price.toFixed(2)}
              </div>
            )}
          </div>
        )}
      </Button>
    </>
  );
};

export default AddToCartButton;
