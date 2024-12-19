import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShoppingBag } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import { useAddToCart } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { formatINR } from '@vestido-ecommerce/utils';

import { ItemToastBody } from '../../components/item-toast-body';
import { SizeSelectorDialog } from '../Wishlist/size-selector';

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
  // const [loading, setLoading] = useState(false);
  const { trigger } = useAddToCart();

  const handleAddToCart = async (selectedVariantId: string | null) => {
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
      // setLoading(true);

      try {
        await trigger({
          itemId: item.id,
          qty: qty,
          variantId: selectedVariantId,
        });

        toast({
          title: '',
          description: ItemToastBody(true, item, 'Item Added to Cart!'),
        });
        console.log('passed toast');
      } catch (error) {
        console.error('Failed to add item to cart', error);
        toast({
          title: 'Error Adding to Cart!',
          description: ItemToastBody(false, item, ''),
        });
      } finally {
        // setLoading(false);
      }
    }
  };

  const buttonHeight = '40px';
  return (
    <SizeSelectorDialog
      itemId={item.id}
      onSizeSelect={(selectedVariantId) => {
        handleAddToCart(selectedVariantId);
      }}
    >
      <Button
        className="relative flex items-center transition-all justify-start duration-300 bg-black hover:bg-white w-full p-0 "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ height: buttonHeight, minHeight: buttonHeight }}
      >
        <div
          className={`flex items-center justify-start gap-3 transition-all duration-300 bg-white p-2 rounded-lg ${
            hovered ? 'w-full' : ''
          }`}
          style={{ height: '100%' }}
        >
          <>
            <LuShoppingBag className="text-black" size={20} />
            {hovered && (
              <span className="ml-2 text-black  font-semibold">
                ADD TO CART
              </span>
            )}
          </>
        </div>
        {!hovered && (
          <div className="ml-4 font-semibold text-left flex-grow text-white ">
            {offerPrice ? (
              <div className="flex items-baseline gap-1">
                <div className="text-white text-base">
                  {formatINR(offerPrice)}
                </div>
                {offerPrice < price ? (
                  <div className="text-gray-500 line-through text-xs">
                    {formatINR(price)}
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div className="text-white text-base">{formatINR(price)}</div>
            )}
          </div>
        )}
      </Button>
    </SizeSelectorDialog>
  );
};

export default AddToCartButton;
