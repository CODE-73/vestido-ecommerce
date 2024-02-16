import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'libs/shadcn-ui/src/ui/tooltip';
import {ZoomIn } from 'lucide-react';

export function QuickViewButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <ZoomIn
            strokeWidth={1.3}
            size={32}
            className="text-gray-600 hover:text-[#48CAB2]"
          />
        </TooltipTrigger>
        <TooltipContent className="rounded-none border-none text-white text-xs font-thin relative top-8 bg-[#333333] right-20">
          <p>Quick View</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
