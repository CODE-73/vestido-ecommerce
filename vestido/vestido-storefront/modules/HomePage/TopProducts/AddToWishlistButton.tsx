import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@vestido-ecommerce/shadcn-ui/tooltip';
import { Heart } from 'lucide-react';

export function AddToWishListButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Heart
            strokeWidth={1.3}
            size={32}
            className="text-gray-600 hover:text-[#48CAB2]"
          />
        </TooltipTrigger>
        <TooltipContent className="rounded-none border-none text-white text-xs font-thin relative top-8 bg-[#333333] right-20">
          <p>Add to Wishlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
