import { useEffect, useState } from 'react';

import { LuHeart } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items/client';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { ItemToastBody } from '../../components/item-toast-body';

type WishlistbuttonProps = {
  className?: string;
  itemId: string;
  size?: number;
  color?: string;
};

const AddToWishListButton: React.FC<WishlistbuttonProps> = ({
  itemId,
  className,
  size,
  color,
}) => {
  const { isAuthenticated, routeToLogin, authLoaded } = useAuth();

  // SWR Queries & Mutations
  const { data: wishlist, isLoading: isWishlistLoading } = useWishlist();

  const isDisabled = !authLoaded;
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

  const isLoading = !authLoaded || isWishlisting || isRemoving;

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      className={`${className} ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
      aria-disabled={isDisabled}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
    >
      <LuHeart
        strokeWidth={1.3}
        size={size ?? 24}
        className={`${isWishlistLoading ? 'invisible' : `text-${color || 'white'} ${!isDisabled && isLoading ? 'animate-pulse' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}`}
        style={{
          fill: wishlisted ? 'red' : 'none',
          color: wishlisted ? 'red' : 'auto',
        }}
      />
    </div>
  );
};

export default AddToWishListButton;
