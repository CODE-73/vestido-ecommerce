import {
  AlignLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Headset,
  MessageCircleQuestion,
  Ruler,
  Settings2,
  Store,
  Truck,
  Undo2,
  Wrench,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import {} from 'lucide-react';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownsOpen, setDropdownsOpen] = useState({
    men: false,
    women: false,
  });
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDropdown = (dropdown: 'men' | 'women') => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
      [dropdown === 'men' ? 'women' : 'men']: false,
    }));
  };
  const toggleSearch = () => {
    if (isSearchExpanded) {
      setIsSearchExpanded(false);
    }
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
    }
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

        <Link href="/">
          <Image src="/assets/favico.ico" alt="Logo" width="25" height="35" />
        </Link>

        <Search size={30} onClick={toggleSearch} className="z-50" />
        {isSearchExpanded && (
          <>
            <Input
              type="text"
              className="absolute inset-0 w-full h-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              placeholder="Search..."
            />
          </>
        )}
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
            <X size={24} />
            Close
          </button>
          <hr />
          <Link href="/cart">
            <div
              onClick={toggleDrawer}
              className="hover:text-[#48CAB2] flex items-center gap-3"
            >
              <ShoppingBag size={28} strokeWidth={1.3} />
              View your cart
            </div>
          </Link>
          <hr />
          <div
            className="flex justify-between"
            onClick={() => toggleDropdown('men')}
          >
            <div className=" flex items-center gap-3">
              <AiOutlineMan size={25} />
              Men
            </div>
            {dropdownsOpen.men ? <ChevronUp /> : <ChevronDown />}
          </div>
          {dropdownsOpen.men && (
            <div className="capitalize font-normal text-md">
              <div
                className="underline decoration-4 underline-offset-4"
                onClick={toggleDrawer}
              >
                Topwears
              </div>
              <div className="flex flex-col pt-4 ">
                <span onClick={toggleDrawer}>Formal Shirts</span>
                <span onClick={toggleDrawer}>Casual Shirts</span>
              </div>
              <hr className="my-4" />
              <div
                onClick={toggleDrawer}
                className="underline decoration-4 underline-offset-4"
              >
                Bottomwears
              </div>
              <div className="flex flex-col pt-4 ">
                <span onClick={toggleDrawer}>Formal Pants</span>
                <span onClick={toggleDrawer}>Casual Pants</span>
              </div>
            </div>
          )}
          <div
            className="flex justify-between"
            onClick={() => toggleDropdown('women')}
          >
            <div className="flex items-center gap-3">
              <AiOutlineWoman size={25} />
              Women
            </div>
            {dropdownsOpen.women ? <ChevronUp /> : <ChevronDown />}
          </div>
          {dropdownsOpen.women && (
            <div className="capitalize font-normal text-md">
              <div className="flex flex-col gap-4 pt-4 ">
                <span onClick={toggleDrawer}>A-line dresses</span>
                <span onClick={toggleDrawer}>Bodycon Dresses</span>
                <span onClick={toggleDrawer}>Floral Dresses</span>
                <span onClick={toggleDrawer}>Cocktail Dresses</span>
              </div>
            </div>
          )}
          <hr />
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Store size={28} strokeWidth={1.3} />
            About Us
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Truck size={28} strokeWidth={1.3} />
            Shipping
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Undo2 size={28} strokeWidth={1.3} /> Return
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <MessageCircleQuestion size={28} strokeWidth={1.3} /> FAQs
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Headset size={28} strokeWidth={1.3} />
            Contact Us
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Wrench size={28} strokeWidth={1.3} /> Maintenance
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Settings2 size={28} strokeWidth={1.3} />
            Settings
          </div>
          <div
            onClick={toggleDrawer}
            className="hover:text-[#48CAB2] flex items-center gap-3"
          >
            <Ruler size={28} strokeWidth={1.3} />
            Size Guide
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
