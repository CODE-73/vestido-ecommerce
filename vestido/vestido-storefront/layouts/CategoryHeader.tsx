import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { AlignLeft } from 'lucide-react';
import { cn } from 'libs/shadcn-ui/src/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CategoriesDropDown from '../modules/HomePage/CategoriesDropDown';
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
const CategoryHeader = () => {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(false);
  useEffect(() => {
    // Check if the current route is the home page ('/')
    if (router.route === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [router.route]);
  return (
    <div className="flex items-center">
      <div className="hidden sm:block">
        {isHomePage ? (
          <div className="bg-[#48CAB2] hidden sm:block uppercase font-semibold text-white  relative">
            <div className="flex gap-4 sm:pl-4 sm:pr-28  sm:py-4">
              <AlignLeft />
              <div>Categories</div>
            </div>
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
          </div>
        ) : (
          <CategoriesDropDown />
        )}
      </div>
      <div className="bg-[#333333] flex-1  sm:py-4">
        <NavigationMenu>
          <NavigationMenuList>
            {categoriesData.map((category, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className="font-semibold h-6 text-white px-4 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-[#48CAB2] hover:border-b-2 border-[#48CAB2] rounded-none mx-3">
                  {category.category}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col p-3 ">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div key={subIndex}>
                        <h1 className=" font-black  px-4">
                          {subcategory.title}
                        </h1>
                        <ul className="text-stone-500 hoer:text-[#48CAB2] py-3 md:w-[200px] lg:w-[200px]">
                          {subcategory.items.map((item, itemIndex) => (
                            <ListItem key={itemIndex} href="/" title={item} />
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
  );
};
export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;
export default CategoryHeader;
