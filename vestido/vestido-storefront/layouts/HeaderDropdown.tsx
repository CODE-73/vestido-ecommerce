import {
  LuHeadphones,
  LuMailQuestion,
  LuRuler,
  LuSettings2,
  LuStore,
  LuTruck,
  LuUndo2,
  LuWrench,
} from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@vestido-ecommerce/shadcn-ui/dropdown-menu';

interface DropdownProps {
  fixedHeader: boolean;
}

const HeaderDropdown: React.FC<DropdownProps> = ({ fixedHeader }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LuMailQuestion size={24} color={fixedHeader ? 'black' : 'white'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-12">
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuStore size={20} strokeWidth={1.3} />
            <div>About Us</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>

          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuTruck size={28} strokeWidth={1.3} />
            Shipping
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>

          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuUndo2 size={28} strokeWidth={1.3} /> Return
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuMailQuestion size={28} strokeWidth={1.3} /> FAQs
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuHeadphones size={28} strokeWidth={1.3} />
            Contact Us
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuWrench size={28} strokeWidth={1.3} /> Maintenance
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuSettings2 size={28} strokeWidth={1.3} />
            Settings
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LuRuler size={28} strokeWidth={1.3} />
            Size Guide
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
