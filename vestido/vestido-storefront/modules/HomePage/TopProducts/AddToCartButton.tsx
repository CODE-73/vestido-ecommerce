import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { LuShoppingBag } from 'react-icons/lu';
import useIsMobile from '../../../hooks/useIsMobile';
import { useState } from 'react';
import { Item } from '@prisma/client';
import { useAddToCart, useItem } from '@vestido-ecommerce/items';

interface AddToCartButtonProps {
  price: number;
  offerPrice?: number;
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

  const handleAddToCart = () => {
    if (item) {
      trigger({
        itemId: item.id,
        qty: qty,
        variantId: product?.variants?.[0]?.id ?? null,
      });
    }
    console.log('added to cart');
  };

  const buttonHeight = '60px'; // Set the desired fixed height

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-row text-xl w-full pt-3">
            <div className="line-through">{price}</div>
            <div className="text-red-700">{offerPrice}</div>
          </div>

          <div className={`p-2 bg-[#48CAB2] w-full`}>
            <Button
              className="bg-[#48CAB2] w-full flex gap-3 text-lg mb-1 text-white p-2"
              onClick={() => handleAddToCart()}
            >
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
              <div
                className={`text-gray-500 ${
                  offerPrice ? 'line-through' : 'text-lg'
                }`}
              >
                {price}
              </div>
              <div className="text-black">{offerPrice}</div>
            </div>
          )}
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
