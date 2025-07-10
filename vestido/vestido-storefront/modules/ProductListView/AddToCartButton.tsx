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
  const authLoaded = false;
  const isDisabled = !authLoaded;
  const { toast } = useToast();
  const [qty] = useState(1);
  const { trigger } = useAddToCart();

  const handleAddToCart = async (selectedVariantId: string | null) => {
    if (!authLoaded) return;
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    if (item) {
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
      }
    }
  };
  return (
    <SizeSelectorDialog
      itemId={item.id}
      onSizeSelect={(selectedVariantId) => {
        handleAddToCart(selectedVariantId);
      }}
    >
      <div
        className={`relative w-full h-full ${isDisabled ? 'pointer-events-none cursor-not-allowed' : 'hover:bg-white transition-all duration-700 '} rounded-lg`}
      >
        <Button
          disabled={isDisabled}
          className={`group/button relative bg-white ${isDisabled ? '' : 'hover:w-full hover:bg-white transition-all duration-700'} w-12  flex justify-start`}
        >
          <LuShoppingBag className="absolute left-3 text-black" size={20} />

          <span className="hidden group-hover/button:block ml-8 text-black font-semibold transition-opacity duration-700 opacity-0 group-hover/button:opacity-100">
            ADD TO CART
          </span>
          <div className="absolute left-10 top-1/2 -translate-y-1/2 ml-4 font-semibold text-left flex-grow text-white opacity-100 transition-opacity duration-700 group-hover/button:opacity-0">
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
        </Button>
      </div>
    </SizeSelectorDialog>
  );
};

export default AddToCartButton;
