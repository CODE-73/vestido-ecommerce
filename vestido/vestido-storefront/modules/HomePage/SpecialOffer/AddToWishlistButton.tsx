import { useMediaQuery } from '@react-hook/media-query';
import { LuHeart } from 'react-icons/lu';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@vestido-ecommerce/shadcn-ui/tooltip';

type WishlistbuttonProps = {
  wishlisted: boolean;
};

export const AddToWishListButton: React.FC<WishlistbuttonProps> = ({
  wishlisted,
}) => {
  const isMdAndAbove = useMediaQuery('(min-width:768px)');
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isMdAndAbove ? (
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
  );
};
