import { useState } from 'react';
import {
  AlignLeft,
  Headset,
  MessageCircleQuestion,
  Ruler,
  Settings2,
  Store,
  Truck,
  Undo2,
  Wrench,
  X,
} from 'lucide-react';

const CategoriesDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  return (
    <div className="bg-[#48CAB2]  uppercase font-semibold text-white relative">
      <div
        className="flex gap-4 sm:pl-4 sm:pr-28  sm:py-4 border-solid border-2 border-white cursor-pointer"
        onClick={toggleDropdown}
      >
        {isOpen ? <X /> : <AlignLeft />}
        <div>Categories</div>
      </div>
      {isOpen && (
        <div className="dropdown flex text-black flex-col gap-11 absolute z-10 pt-3 pb-2 bg-white w-full cursor-pointer border-solid border-2 border-slate-200 pl-2">
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Store size={28} strokeWidth={1.3} />
            About Us
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Truck size={28} strokeWidth={1.3} />
            Shipping
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Undo2 size={28} strokeWidth={1.3} /> Return
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <MessageCircleQuestion size={28} strokeWidth={1.3} /> FAQs
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Headset size={28} strokeWidth={1.3} />
            Contact Us
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Wrench size={28} strokeWidth={1.3} /> Maintenance
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Settings2 size={28} strokeWidth={1.3} />
            Settings
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <Ruler size={28} strokeWidth={1.3} />
            Size Guide
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropDown;
