import { AlignLeft, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="bg-white shadow py-4 px-6 md:px-10">
      <div className="flex justify-between items-center">
        {/* Hamburger Icon */}
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

        {/* Logo or Brand */}
        <span>
          {' '}
          <Image src="/assets/favico.ico" alt="Logo" width="25" height="35" />
        </span>
        <div className="flex gap-5">
          <Link href="/cart" className="hover:text-[#48cab2]">
            <Search size={30} />
          </Link>
          <Link href="/cart" className="hover:text-[#48cab2]">
            <ShoppingBag size={30} />
          </Link>
        </div>

        {/* Placeholder for other header elements */}
      </div>

      {/* Drawer */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform transition-transform duration-200 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end pt-4 pr-4">
          <button className="text-black">
            <AiOutlineClose size={24} onClick={toggleDrawer} />
          </button>
        </div>
        {/* Drawer Content */}
        <div className="bg-white h-full w-64 fixed left-0 top-0 shadow-lg p-4">
          {/* Your drawer content */}
        </div>
      </div>
    </header>
  );
};

export default Header;
