import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AiOutlineClose, AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import {
  LuAlignLeft,
  LuChevronDown,
  LuChevronUp,
  LuHeadphones,
  LuMailQuestion,
  LuRuler,
  LuSearch,
  LuSettings2,
  LuShoppingBag,
  LuStore,
  LuTruck,
  LuUndo2,
  LuWrench,
  LuX,
} from 'react-icons/lu';

import { Gender, useCategories } from '@vestido-ecommerce/items/client';

import { ListItem } from '../../components/Menubar';
import LogoutButton from '../LogoutButton';
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
      <div
        className={`md:hidden fixed inset-0 bg-gray-700 bg-opacity-75 z-50 transform transition-transform duration-200 overflow-y-scroll ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Content */}
        <div className="bg-white min-h-screen h-auto w-80 fixed left-0 top-0 shadow-lg p-4 pt-0 flex flex-col gap-5 uppercase font-bold tracking-wide text-slate-500">
          <div className="sticky top-0 bg-white py-4 text-right">
            <button
              className="text-gray-400 flex gap-2 z-50"
              onClick={toggleDrawer}
            >
              <LuX size={24} />
              Close
            </button>
          </div>
          <hr />
          <Link href="/cart">
            <div onClick={toggleDrawer} className=" flex items-center gap-3">
              <LuShoppingBag size={28} strokeWidth={1.3} />
              View your cart
              <div className="text-white h-5 w-5 text-center rounded-full bg-black font-semibold text-sm">
                {cart_count ?? 0}
              </div>
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
            {dropdownsOpen.men ? <LuChevronUp /> : <LuChevronDown />}
          </div>
          {dropdownsOpen.men && (
            <>
              {mainCategories
                ?.filter(
                  (category) =>
                    category.gender.includes('MEN') &&
                    !category.gender.includes('WOMEN'),
                )
                .map((category, index) => (
                  <div key={index}>
                    <div
                      onClick={toggleDrawer}
                      className=" capitalize px-2 cursor-pointer"
                    >
                      <Link href={`/${category.slug}`}>{category.name}</Link>
                    </div>

                    <ul className="capitalize py-3 md:w-[200px] lg:w-[200px]">
                      {getSubcategories(category.id, ['MEN'])?.map(
                        (subcategory, subIndex) => (
                          <div key={subIndex} onClick={toggleDrawer}>
                            <ListItem
                              href={`/${subcategory.id}`}
                              title={subcategory.name}
                            />
                          </div>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
            </>
          )}
          <div
            className="flex justify-between"
            onClick={() => toggleDropdown('women')}
          >
            <div className="flex items-center gap-3">
              <AiOutlineWoman size={25} />
              Women
            </div>
            {dropdownsOpen.women ? <LuChevronUp /> : <LuChevronDown />}
          </div>
          {dropdownsOpen.women && (
            <>
              {mainCategories
                ?.filter(
                  (category) =>
                    category.gender.includes('WOMEN') &&
                    !category.gender.includes('MEN'),
                )
                .map((category, index) => (
                  <div key={index}>
                    <div
                      onClick={toggleDrawer}
                      className="capitalize  px-2 cursor-pointer"
                    >
                      <Link href={`/${category.slug}`}>{category.name}</Link>
                    </div>

                    <ul className=" capitalize py-3 md:w-[200px] lg:w-[200px]">
                      {getSubcategories(category.id, ['WOMEN'])?.map(
                        (subcategory, subIndex) => (
                          <div
                            key={subIndex}
                            onClick={toggleDrawer}
                            className="hover:text-green-300"
                          >
                            <ListItem
                              href={`/${subcategory.id}`}
                              title={subcategory.name}
                            />
                          </div>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
            </>
          )}
          <div
            className="flex justify-between"
            onClick={() => toggleDropdown('unisex')}
          >
            <div className=" flex items-center gap-3">
              <div className="flex gap-0">
                <AiOutlineWoman size={23} className="-mr-3.5" />
                <AiOutlineMan size={23} className="-mt-1.5" />
              </div>
              Unisex
            </div>
            {dropdownsOpen.unisex ? <LuChevronUp /> : <LuChevronDown />}
          </div>
          {dropdownsOpen.unisex && (
            <>
              {mainCategories
                ?.filter(
                  (category) =>
                    category.gender.includes('MEN') &&
                    category.gender.includes('WOMEN'),
                )
                .map((category, index) => (
                  <div key={index}>
                    <div
                      onClick={toggleDrawer}
                      className=" capitalize px-2 cursor-pointer"
                    >
                      <Link href={`/${category.slug}`}>{category.name}</Link>
                    </div>
                    {getSubcategories(category.id, ['MEN', 'WOMEN']) && (
                      <ul className=" capitalize py-3 md:w-[200px] lg:w-[200px]">
                        {getSubcategories(category.id, ['MEN', 'WOMEN'])?.map(
                          (subcategory, subIndex) => (
                            <div
                              key={subIndex}
                              className="hover:text-green-300"
                              onClick={toggleDrawer}
                            >
                              <ListItem
                                href={`/${subcategory.id}`}
                                title={subcategory.name}
                              />
                            </div>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                ))}
            </>
          )}

          <hr />
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuStore size={28} strokeWidth={1.3} />
            About Us
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuTruck size={28} strokeWidth={1.3} />
            Shipping
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuUndo2 size={28} strokeWidth={1.3} /> Return
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuMailQuestion size={28} strokeWidth={1.3} /> FAQs
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuHeadphones size={28} strokeWidth={1.3} />
            Contact Us
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuWrench size={28} strokeWidth={1.3} /> Maintenance
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuSettings2 size={28} strokeWidth={1.3} />
            Settings
          </div>
          <div onClick={toggleDrawer} className=" flex items-center gap-3">
            <LuRuler size={28} strokeWidth={1.3} />
            Size Guide
          </div>
          <LogoutButton className="mr-auto" />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
