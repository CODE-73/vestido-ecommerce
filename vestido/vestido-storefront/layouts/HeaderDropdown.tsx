import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@vestido-ecommerce/shadcn-ui/dropdown-menu';
import {
  Headset,
  MessageCircleQuestion,
  Ruler,
  Settings2,
  Store,
  Truck,
  Undo2,
  Wrench,
} from 'lucide-react';

interface DropdownProps {
  fixedHeader: boolean;
}

const HeaderDropdown: React.FC<DropdownProps> = ({ fixedHeader }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MessageCircleQuestion color={fixedHeader ? 'black' : 'white'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-12">
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Store size={20} strokeWidth={1.3} />
            <div>About Us</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {' '}
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Truck size={28} strokeWidth={1.3} />
            Shipping
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {' '}
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Undo2 size={28} strokeWidth={1.3} /> Return
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <MessageCircleQuestion size={28} strokeWidth={1.3} /> FAQs
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Headset size={28} strokeWidth={1.3} />
            Contact Us
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Wrench size={28} strokeWidth={1.3} /> Maintenance
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Settings2 size={28} strokeWidth={1.3} />
            Settings
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Ruler size={28} strokeWidth={1.3} />
            Size Guide
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
