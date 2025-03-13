import * as React from 'react';
import Link from 'next/link';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';

// import useIsMobile from '../hooks/useIsMobile';
import { Gender } from '@vestido-ecommerce/items';
import { useCategories } from '@vestido-ecommerce/items/client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';

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

type NavMenuProps = {
  isFixed: boolean;
};

const NavMenu: React.FC<NavMenuProps> = ({ isFixed }) => {
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

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-white rounded-none mx-3 focus:bg-transparent ${isFixed ? '' : 'text-white focus:text-white '
              }`}
          >
            MEN
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex flex-col p-6 w-[100px] ">
            {mainCategories
              ?.filter((category) => category.gender.includes('MEN'))
              .map((category, index) => (
                <div key={index}>
                  <div className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                    <Link href={`/${category.id}`}>{category.name}</Link>
                  </div>

                  <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                    {getSubcategories(category.id, ['MEN'])?.map(
                      (subcategory, subIndex) => (
                        <div key={subIndex}>
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-white  rounded-none mx-3 focus:bg-transparent ${isFixed ? '' : 'text-white focus:text-white '
              }`}
          >
            WOMEN
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex flex-col p-6 w-[100px] ">
            {mainCategories
              ?.filter((category) => category.gender.includes('WOMEN'))
              .map((category, index) => (
                <div
                  key={index}
                // className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                >
                  <div className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                    <Link href={`/${category.id}`}>{category.name}</Link>
                  </div>

                  <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                    {getSubcategories(category.id, ['WOMEN'])?.map(
                      (subcategory, subIndex) => (
                        <div key={subIndex} className="hover:text-[#48cab2]">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-white rounded-none mx-3 focus:bg-transparent ${isFixed ? '' : 'text-white focus:text-white '
              }`}
          >
            UNISEX
          </NavigationMenuTrigger>

          <NavigationMenuContent className="flex flex-col p-6 w-[100px] ">
            {mainCategories
              ?.filter(
                (category) =>
                  category.gender.includes('MEN') &&
                  category.gender.includes('WOMEN'),
              )
              .map((category, index) => (
                <div key={index}>
                  <div className=" text-stone-500  capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                    <Link href={`/${category.id}`}>{category.name}</Link>
                  </div>

                  <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                    {getSubcategories(category.id, ['MEN', 'WOMEN'])?.map(
                      (subcategory, subIndex) => (
                        <div key={subIndex} className="hover:text-[#48cab2]">
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      {/* < NavigationMenuViewport /> */}
    </NavigationMenu>
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

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={clsx('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={clsx(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

export default NavMenu;
