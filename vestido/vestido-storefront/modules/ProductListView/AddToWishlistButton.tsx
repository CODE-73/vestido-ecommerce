import { useEffect, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { LuHeart} from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items/client';
import { LuLoader2 } from "react-icons/lu";
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { ItemToastBody } from '../../components/item-toast-body';

type WishlistbuttonProps = {
  className?: string;
  itemId: string;
 size? : number;
};

const AddToWishListButton: React.FC<WishlistbuttonProps> = ({
  itemId,
  className,
 size
}) => {
  const isMdAndAbove = useMediaQuery('(min-width:768px)');

  const { isAuthenticated, routeToLogin } = useAuth();

  // SWR Queries & Mutations
  const { data: wishlist, isLoading: isWishlistLoading } = useWishlist();
  const { trigger: wishlistTrigger, isMutating: isWishlisting } =
    useAddToWishlist();
  const { trigger: removeWishlistTrigger, isMutating: isRemoving } =
    useRemoveFromWishlist();

  const { toast } = useToast();

  const [wishlisted, setWishlisted] = useState<boolean | null>(false);

  useEffect(() => {
    setWishlisted(
      wishlist?.data?.some((wishlistItem) => wishlistItem.itemId === itemId) ??
        false,
    );
  }, [wishlist, itemId]);

  const removeItem = (itemId: string) => {
    return wishlist?.data.find((x) => x.itemId === itemId);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isLoading) {
      return;
    }

    e.stopPropagation();
    if (!isAuthenticated) {
      routeToLogin();
      return;
    }

    setWishlisted(null);
    if (wishlisted) {
      removeWishlistTrigger({ itemId: itemId });
      const removedItem = removeItem(itemId);
      if (!removedItem) {
        toast({
          title: 'Error',
          description: 'Item not found in the cart!',
        });
      } else {
        toast({
          title: '',
          description: ItemToastBody(
            false,
            removedItem.item,
            'Item removed from Wishlist',
          ),
        });
      }
    } else {
      wishlistTrigger({ itemId: itemId });
      toast({
        title: 'Added to Wishlist',
      });
    }
  };

  const isLoading = isWishlisting || isRemoving;

  return (
    <div onClick={onClick} className={className}>
   
            {isLoading ? (       
                 <LuLoader2
                strokeWidth={1.3}
                size={size ?? 24}
                className={`${isWishlistLoading ? 'invisible': 'text-gray-600 animate-spin'}`}
               
              />        
            )  : (
              <LuHeart
                strokeWidth={1.3}
                size={size ?? 24}
                className={`${isWishlistLoading ? 'invisible': 'text-gray-600'} `}
                style={{
                  fill: wishlisted ? 'red' : 'none',
                  color: wishlisted ? 'red' : '',
                }}
              />
            )}   
    </div>
  );
};

export default AddToWishListButton;
