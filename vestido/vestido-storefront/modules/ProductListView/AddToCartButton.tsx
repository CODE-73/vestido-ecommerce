import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShoppingBag } from 'react-icons/lu';

import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import { formatINR } from '@vestido-ecommerce/utils';

import { AddToCartDialog } from '../Wishlist/AddToCartSizeSelector';

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

  // const { data } = useItem(item.id);

  const buttonHeight = '40px';
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <AddToCartDialog itemId={item.id} />
    </Dialog>
  );
};

export default AddToCartButton;
