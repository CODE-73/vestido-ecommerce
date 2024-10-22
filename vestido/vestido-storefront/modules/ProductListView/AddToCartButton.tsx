import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShoppingBag } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useAddToCart, useItem } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { ItemToastBody } from '../../components/item-toast-body';

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
  const { toast } = useToast();
  const [hovered, setHovered] = useState(false);
  const [qty] = useState(1);
  const [loading, setLoading] = useState(false); // State to show loading
  // const [success, setSuccess] = useState(false);
  const { data } = useItem(item.id);
  const product = data?.data;
  const { trigger } = useAddToCart();

  const defaultVar = product?.variants.find((x) => x.default == true);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
      setLoading(true); // Set loading to true when the process starts
      // setSuccess(false);
      // Reset success state when a new action starts

      try {
        await trigger({
          itemId: item.id,
          qty: qty,
          variantId: defaultVar?.id ?? product?.variants?.[0]?.id ?? null,
        });

        toast({
          title: '',
          description: ItemToastBody(
            true,
            item,
            product?.title,
            product?.description,
            'Item Added to Cart!',
          ),
        });
        console.log('passed toast');
      } catch (error) {
        console.error('Failed to add item to cart', error);
        toast({
          title: 'Error Adding to Cart!',
          description: ItemToastBody(false, item, product?.title, '', ''),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const buttonHeight = '40px';
  return (
    <Button
      className="relative flex items-center transition-all justify-start duration-300 bg-black rounded-none hover:bg-[#48CAB2] w-full p-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: buttonHeight, minHeight: buttonHeight }}
      onClick={() => handleAddToCart()}
      disabled={loading}
    >
      <div
        className={`flex items-center justify-start gap-3 transition-all duration-300 bg-[#48CAB2] p-2 ${
          hovered ? 'w-full' : ''
        }`}
        style={{ height: '100%' }}
      >
        {loading ? (
          <span className="ml-2 text-white text-lg font-semibold">
            Adding...
          </span>
        ) : (
          <>
            <LuShoppingBag className="text-white" size={20} />
            {hovered && (
              <span className="ml-2 text-white text-lg font-semibold">
                ADD TO CART
              </span>
            )}
          </>
        )}
      </div>
      {!hovered && !loading && (
        <div className="ml-4 font-semibold text-left flex-grow text-white ">
          {offerPrice ? (
            <div className="flex items-baseline gap-1">
              <div className="text-white text-base">
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
            <div className="text-white text-base">
              ₹&nbsp;{price.toFixed(2)}
            </div>
          )}
        </div>
      )}
    </Button>
  );
};

export default AddToCartButton;
