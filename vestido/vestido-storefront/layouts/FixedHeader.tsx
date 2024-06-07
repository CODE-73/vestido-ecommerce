import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { NavigationMenuTrigger } from './MainHeader';
import { Heart, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { InputProps } from '@vestido-ecommerce/shadcn-ui/input';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import HeaderDropdown from './HeaderDropdown';

type ListItemProps = {
  href: string;
  title: string;
};

const ListItem: React.FC<ListItemProps> = ({ href, title }) => (
  <li className="row-span-3">
    <a
      className="flex select-none flex-col justify-start md:justify-end rounded-md  pl-3 no-underline outline-none focus:shadow-md"
      href={href}
    >
      <div className="font-normal text-sm font-medium p-1">{title}</div>
    </a>
  </li>
);

const categoriesData = [
  {
    category: "MEN'S",
    subcategories: [
      {
        title: 'Top Wear',
        items: [
          'Casual Shirts',
          'Formal Shirts',
          'Denim Shirts',
          'T Shirts',
          'Hoodies',
        ],
      },
      {
        title: 'Bottom Wear',
        items: [
          'Baggy Jeans',
          'Casual Jeans',
          'Cargo Pants',
          'Formal Pants',
          'Jogger',
        ],
      },
    ],
  },
  {
    category: "WOMEN'S",
    subcategories: [
      {
        title: 'Dresses',
        items: [
          'A-Line Dress',
          'Floaral Dress',
          'Bodycon Dress',
          'Cocktail Dress',
          'Casual Dress',
        ],
      },
      {
        title: 'Other',
        items: ['Kurthi Dress', 'Wrap Dress', 'Salwar Dress'],
      },
    ],
  },
  {
    category: 'KIDS',
    subcategories: [
      {
        title: 'Boys',
        items: [
          'Casual Shirts',
          'Formal Shirts',
          'Denim Shirts',
          'T Shirts',
          'Hoodies',
        ],
      },
      {
        title: 'Girls',
        items: [
          'A-Line Dress',
          'Floaral Dress',
          'Bodycon Dress',
          'Cocktail Dress',
          'Casual Dress',
        ],
      },
    ],
  },
];

const FixedHeader = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <div className=" w-full bg-white shadow flex  justify-center z-10">
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
          onClick={toggleSearch}
        ></div>
      )}
      {isSearchOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bg-white z-30 transition-transform ease-in duration-500 ${
            isSearchOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex justify-center">
            <div className="max-w-7xl flex-1 pb-10">
              <div className="flex w-full justify-between p-4">
                <div className="text-gray-500 font-light text-lg">
                  What are you looking for ?
                </div>
                <button onClick={toggleSearch} className="hover:text-[#48cab2]">
                  <X />
                </button>
              </div>
              <div className="relative hidden md:flex space-x-4 items-center justify-items-center content-center pt-5 ">
                <Input
                  name="search-products"
                  placeholder="Search Products..."
                  type="search"
                  className="rounded-none max-w-56  border-t-0 border-r-0 border-l-0 border-b-1 border-gray-300 focus:border-none"
                />
                <Search
                  className="absolute right-2 bottom-1 -translate-y-1/2 text-slate-400 hover:text-[#48cab2]"
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-1 justify-around items-center max-w-7xl ">
        <Link href="/" className="self-center">
          {isMobile ? (
            <span>
              <Image
                src="/assets/favico.ico"
                alt="Logo"
                width="25"
                height="35"
              />
            </span>
          ) : (
            <span className="self-end">
              <Image
                src="/assets/new-logo.png"
                alt="Logo"
                width="250"
                height="250"
              />
            </span>
          )}
        </Link>
        <div className=" sm:py-4 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {categoriesData.map((category, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="font-semibold h-6 px-4 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-[#48CAB2] hover:border-b-2 border-[#48CAB2] rounded-none mx-3">
                    {category.category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex flex-col p-3">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex}>
                          <h1 className="font-black px-4 hover:text-[#48cab2] py-2">
                            {subcategory.title}
                          </h1>
                          <ul className=" text-stone-500 grid gap-1 md:w-[200px]">
                            {subcategory.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="hover:text-[#48cab2]"
                              >
                                <ListItem href="/" title={item} />
                              </div>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex space-x-4 py-4 ">
          <span className="hover:text-[#48cab2]">
            <Search onClick={toggleSearch} />
          </span>
          <Link href="/user" className="hover:text-[#48cab2]">
            <UserRound />
          </Link>

          <Link href="/wishlist/" className="hover:text-[#48cab2]">
            <Heart />
          </Link>
          <Link href="/cart" className="hover:text-[#48cab2]">
            <ShoppingBag />
          </Link>
          <HeaderDropdown fixedHeader={true} />
        </div>
      </div>
    </div>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:font-medium placeholder:text-black placeholder:text-2xl placeholder:font-semibold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default FixedHeader;
