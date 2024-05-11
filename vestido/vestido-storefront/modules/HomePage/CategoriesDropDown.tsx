import { AlignLeft, X } from 'lucide-react';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { IoIosReturnLeft } from 'react-icons/io';
import { FaQuestionCircle } from 'react-icons/fa';
import { TbRulerMeasure } from 'react-icons/tb';
import { IoCallOutline, IoSettingsOutline } from 'react-icons/io5';
import { TiSpannerOutline } from 'react-icons/ti';

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
            <BsInfoCircle size={25} />
            About Us
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <LiaShippingFastSolid size={25} />
            Shipping
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <IoIosReturnLeft size={25} /> Return
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <FaQuestionCircle size={25} /> FAQs
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <IoCallOutline size={25} />
            Contact Us
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <TiSpannerOutline size={25} /> Maintenance
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <IoSettingsOutline size={25} />
            Settings
          </div>
          <div className="hover:text-[#48CAB2] flex items-center gap-3">
            <TbRulerMeasure size={25} />
            Size Guide
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropDown;
