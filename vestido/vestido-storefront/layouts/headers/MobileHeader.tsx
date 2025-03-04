import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineClose, AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import {
  LuAlignLeft,
  LuMinus,
  LuPlus,
  LuSearch,
  LuX,
} from 'react-icons/lu';

import { Gender, useCategories } from '@vestido-ecommerce/items/client';

import { ListItem } from '../../components/Menubar';
import { HeaderSearchInput } from './HeaderSearchInput';

interface HeaderProps {
  cart_count: number;
  wishlist_count: number;
}
const MobileHeader: React.FC<HeaderProps> = ({ cart_count }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dropdownsOpen, setDropdownsOpen] = useState({
    men: false,
    women: false,
    unisex: false,
  });
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: categories } = useCategories();

  //   const isMobile = useIsMobile();

  const mainCategories = categories?.data?.filter(
    (category) => category.parentCategoryId === null,
  );

  const getSubcategories = (categoryId: string, genders: Gender[]) => {
    return categories?.data?.filter(
      (subcategory) =>
        subcategory.parentCategoryId === categoryId &&
        genders.every((gender) => subcategory.gender.includes(gender)),
    );
  };

  const toggleDropdown = (dropdown: 'men' | 'women' | 'unisex') => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
      men: dropdown === 'men' ? !prevState[dropdown] : false,
      women: dropdown === 'women' ? !prevState[dropdown] : false,
      unisex: dropdown === 'unisex' ? !prevState[dropdown] : false,
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
    <header className="bg-black shadow-lg shadow-gray-700/50 py-4 px-2 md:px-10">
      <div className="flex justify-between items-center">
        <div className="text-white md:hidden" onClick={toggleDrawer}>
          {isDrawerOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <LuAlignLeft color="white" size={26} />
          )}
        </div>

        <Link href="/">
          <Image
            src="/assets/vestido-nation-logo.png"
            alt="Logo"
            width="200"
            height="35"
          />
        </Link>

        {isSearchExpanded ? (
          <HeaderSearchInput
            iconSize={32}
            onCancelClick={toggleSearch}
            containerClassName="absolute  inset-0 w-full h-full p-2 border border-gray-300 rounded-l-md focus:outline-none bg-white"
          />
        ) : (
          <LuSearch
            size={30}
            onClick={toggleSearch}
            className="z-50"
            color="white"
          />
        )}
      </div>

      {/* Drawer */}
      
    </header>
  );
};

export default MobileHeader;
