import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { clsx } from 'clsx';
import { LuUser2, LuHeart, LuShoppingBag, LuSearch } from 'react-icons/lu';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import Link from 'next/link';
import Image from 'next/image';
import useIsMobile from '../hooks/useIsMobile';
import HeaderDropdown from './HeaderDropdown';

type ListItemProps = {
  href: string;
  title: string;
};
const ListItem: React.FC<ListItemProps> = ({ href, title }) => (
  <li className="row-span-3">
    <Link
      className="flex select-none flex-col justify-start md:justify-end rounded-md  pl-3 no-underline outline-none focus:shadow-md"
      href={href}
    >
      <div className="font-normal text-sm font-medium p-1">{title}</div>
    </Link>
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
          'Floral Dress',
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
];

interface HeaderProps {
  cart_count: number | undefined;
  wishlist_count: number | undefined;
}
const MainHeader: React.FC<HeaderProps> = ({ cart_count, wishlist_count }) => {
  const isMobile = useIsMobile();

  // const { data: categories } = useCategories();

  // console.log(categories);
  return (
    <div className="bg-[#1B2149] flex items-center  justify-between px-3">
      <div className="flex">
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
                src="/assets/white-logo.png"
                alt="Logo"
                width="180"
                height="180"
              />
            </span>
          )}
        </Link>
        <div className=" sm:py-4">
          <NavigationMenu>
            <NavigationMenuList>
              {categoriesData.map((category, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="font-semibold h-6 text-white bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-white hover:border-b-2 border-[#48CAB2] rounded-none mx-3 focus:bg-transparent focus:text-white">
                    {category.category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex flex-col p-3 ">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex}>
                          <Link href="/products">
                            <h1 className=" font-black hover:text-[#48cab2] px-4">
                              {subcategory.title}
                            </h1>
                          </Link>
                          <ul className="text-stone-500 py-3 md:w-[200px] lg:w-[200px]">
                            {subcategory.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="hover:text-[#48cab2]"
                              >
                                <ListItem href="/products" title={item} />
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
      </div>
      <div className=" relative hidden md:flex space-x-4 items-center justify-items-center content-center">
        <Input
          name="search-products"
          placeholder="Search Products..."
          type="search"
          className="rounded-none max-w-28 bg-transparent text-white border-slate-300"
        />
        <LuSearch
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#48cab2]"
          size={24}
        />
      </div>
      <div className="flex ">
        <Link href="/user" className="text-white hover:text-[#48cab2] px-3">
          <LuUser2 size={24} />
        </Link>

        <Link
          href="/wishlist"
          className=" relative text-white hover:text-[#48cab2] "
        >
          <LuHeart size={24} />
        </Link>
        <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
          {wishlist_count}
        </sup>
        <Link href="/cart" className="text-white  hover:text-[#48cab2]">
          <LuShoppingBag size={24} />
        </Link>
        <sup className="relative right-2 text-white h-4 w-4 text-center rounded-full bg-[#48cab2] font-semibold text-xs">
          {cart_count}
        </sup>

        <HeaderDropdown fixedHeader={false} />
      </div>
    </div>
  );
};
export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={clsx(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
export default MainHeader;
