import { AlignLeft, X } from 'lucide-react';
import { useState } from 'react';

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
        <div className="dropdown flex text-black flex-col gap-11 absolute z-10 pt-3 bg-white w-full cursor-pointer border-solid border-2 border-slate-200 pl-2">
          <div className="hover:text-[#48CAB2] ">About Us</div>
          <div className="hover:text-[#48CAB2]">Shipping</div>
          <div className="hover:text-[#48CAB2]">Return</div>
          <div className="hover:text-[#48CAB2]">FAQs</div>
          <div className="hover:text-[#48CAB2]">Contact Us</div>
          <div className="hover:text-[#48CAB2]">Maintenance</div>
          <div className="hover:text-[#48CAB2]">Settings</div>
          <div className="hover:text-[#48CAB2]">Documentation</div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropDown;
