import { AlignLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import { BsInfoCircle } from 'react-icons/bs';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { IoIosReturnLeft } from 'react-icons/io';
import { FaQuestionCircle } from 'react-icons/fa';
import { TbRulerMeasure } from 'react-icons/tb';
import { IoCallOutline, IoSettingsOutline } from 'react-icons/io5';
import { TiSpannerOutline } from 'react-icons/ti';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="bg-white shadow py-4 px-6 md:px-10">
      <div className="flex justify-between items-center">
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={toggleDrawer}
        >
          {isDrawerOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AlignLeft color="black" />
          )}
        </button>

        <span>
          {' '}
          <Image src="/assets/favico.ico" alt="Logo" width="25" height="35" />
        </span>

        <Search size={30} />
      </div>

      {/* Drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-700 bg-opacity-75 z-50 transform transition-transform duration-200 overflow-y-scroll ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Content */}
        <div className="bg-white h-full w-80 fixed left-0 top-0 shadow-lg p-4 flex flex-col gap-5 uppercase font-bold tracking-wide text-slate-500">
          <button
            className="text-gray-400 flex gap-2 mb-10"
            onClick={toggleDrawer}
          >
            <AiOutlineClose size={24} />
            Close
          </button>
          <div className="flex justify-between">
            <div className=" flex items-center gap-3">
              <AiOutlineMan size={25} />
              Men
            </div>
            <ChevronRight />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <AiOutlineWoman size={25} />
              Women
            </div>
            <ChevronRight />
          </div>{' '}
          <hr />
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
      </div>
    </header>
  );
};

export default Header;
