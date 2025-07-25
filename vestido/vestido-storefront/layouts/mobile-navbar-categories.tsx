import { useState } from 'react';
import Link from 'next/link';

import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { LuMinus, LuPlus, LuX } from 'react-icons/lu';

import { Gender, useCategories } from '@vestido-ecommerce/items/client';

import { CategoryNavItem } from '../components/nav-menu';

type CategoriesDrawerProps = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
};

const CategoriesDrawer: React.FC<CategoriesDrawerProps> = ({
  // isDrawerOpen,
  toggleDrawer,
}) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    men: false,
    women: false,
    unisex: false,
  });

  const { data: categories } = useCategories();

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

  return (
    <div className={` bg-opacity-75 overflow-y-scroll w-full`}>
      {/* Drawer Content */}
      <div className="h-auto w-80 w-full shadow-lg p-4 pb-0 pt-0 flex flex-col gap-5 align-end uppercase font-bold tracking-wide text-white">
        <div className="sticky top-0 py-4 w-full flex justify-between">
          <div className="capitalize">Categories</div>
          <button className="flex gap-2 z-50 " onClick={toggleDrawer}>
            <LuX size={22} />
          </button>
        </div>
        <hr className="border-t border-white/30" />

        <div
          className="flex justify-between"
          onClick={() => toggleDropdown('men')}
        >
          <div className=" flex items-center gap-3">
            <AiOutlineMan size={25} />
            Men
          </div>
          {dropdownsOpen.men ? <LuMinus /> : <LuPlus />}
        </div>
        <hr className="border-t border-white/30" />
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

                  <ul className="capitalize md:w-[200px] lg:w-[200px]">
                    {getSubcategories(category.id, ['MEN'])?.map(
                      (subcategory, subIndex) => (
                        <div key={subIndex} onClick={toggleDrawer}>
                          <CategoryNavItem
                            href={`/${subcategory.id}`}
                            title={subcategory.name}
                          />
                        </div>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            <hr className="border-t border-white/30" />
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
          {dropdownsOpen.women ? <LuMinus /> : <LuPlus />}
        </div>
        <hr className="border-t border-white/30" />
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

                  <ul className=" capitalize md:w-[200px] lg:w-[200px]">
                    {getSubcategories(category.id, ['WOMEN'])?.map(
                      (subcategory, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={toggleDrawer}
                          className="hover:text-green-300"
                        >
                          <CategoryNavItem
                            href={`/${subcategory.id}`}
                            title={subcategory.name}
                          />
                        </div>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            <hr className="border-t border-white/30" />
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
          {/* {dropdownsOpen.unisex ? <LuChevronUp /> : <LuChevronDown />} */}
          {dropdownsOpen.unisex ? <LuMinus /> : <LuPlus />}
        </div>
        <hr className="border-t border-white/30" />
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
                    <ul className=" capitalize  md:w-[200px] lg:w-[200px]">
                      {getSubcategories(category.id, ['MEN', 'WOMEN'])?.map(
                        (subcategory, subIndex) => (
                          <div
                            key={subIndex}
                            className="hover:text-green-300"
                            onClick={toggleDrawer}
                          >
                            <CategoryNavItem
                              href={`/${subcategory.slug}`}
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
        {/* <hr className="border-t border-white/30" /> */}
      </div>
    </div>
  );
};

export default CategoriesDrawer;
