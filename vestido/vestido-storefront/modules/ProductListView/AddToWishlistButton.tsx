import { useEffect, useState } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { LuHeart, LuLoader } from 'react-icons/lu';

import { useAuth } from '@vestido-ecommerce/auth/client';
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from '@vestido-ecommerce/items/client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@vestido-ecommerce/shadcn-ui/tooltip';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { ItemToastBody } from '../../components/item-toast-body';

type WishlistbuttonProps = {
  className?: string;
  itemId: string;
};

const AddToWishListButton: React.FC<WishlistbuttonProps> = ({
  itemId,
  className,
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
    const removingItem = wishlist?.data.find((x) => x.itemId === itemId);
    const images = (removingItem?.item.images ?? []) as ImageSchemaType[];
    return { removingItem, images };
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
      const _removingItem = removeItem(itemId).removingItem?.item;

      toast({
        title: '',
        description: ItemToastBody(
          false,
          _removingItem?.title,
          _removingItem?.description,
          'Item removed from Wishlist',
          removeItem(itemId).images[0]?.url ?? '',
        ),
      });
    } else {
      wishlistTrigger({ itemId: itemId });
      toast({
        title: 'Added to Wishlist',
      });
    }
  };

  const isLoading =
    wishlisted === null || isWishlistLoading || isWishlisting || isRemoving;

  return (
    <div onClick={onClick} className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {isLoading ? (
              <LuLoader
                strokeWidth={1.3}
                size={32}
                className="text-gray-600 hover:text-[#48CAB2]"
              />
            ) : isMdAndAbove ? (
              <LuHeart
                strokeWidth={1.3}
                size={32}
                className="text-gray-600 hover:text-[#48CAB2]"
                style={{
                  fill: wishlisted ? 'red' : 'none',
                  color: wishlisted ? 'red' : '',
                }}
              />
            ) : (
              <LuHeart
                strokeWidth={1.3}
                size={24}
                className="text-gray-600 hover:text-[#48CAB2]"
                style={{
                  fill: wishlisted ? 'red' : 'none',
                  color: wishlisted ? 'red' : '',
                }}
              />
            )}
          </TooltipTrigger>
          <TooltipContent className="rounded-none border-none text-white text-xs font-thin relative top-8 bg-[#333333] right-20">
            <p>Add to Wishlist</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AddToWishListButton;
