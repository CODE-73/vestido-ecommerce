import * as React from 'react';
import Link from 'next/link';

import { Gender, useCategories } from '@vestido-ecommerce/items';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@vestido-ecommerce/shadcn-ui/menubar';

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

const HeaderMenubar: React.FC<NavMenuProps> = ({ isFixed }) => {
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
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger
          className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-green-300 data-[state=open]:text-green-300 rounded-none mx-3 focus:bg-transparent ${
            isFixed ? '' : 'text-white focus:text-white '
          }`}
        >
          MEN
        </MenubarTrigger>
        <MenubarContent className="w-[100px] ">
          {mainCategories
            ?.filter((category) => category.gender.includes('MEN'))
            .map((category, index) => (
              <div key={index}>
                <MenubarItem className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                  <Link href={`/${category.id}`}>{category.name}</Link>
                </MenubarItem>

                <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                  {getSubcategories(category.id, ['MEN'])?.map(
                    (subcategory, subIndex) => (
                      <MenubarItem
                        key={subIndex}
                        className="hover:text-green-300"
                      >
                        <ListItem
                          href={`/${subcategory.id}`}
                          title={subcategory.name}
                        />
                      </MenubarItem>
                    ),
                  )}
                </ul>
              </div>
            ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-green-300 hover:text-green-300 rounded-none mx-3 focus:bg-transparent ${
            isFixed ? '' : 'text-white focus:text-white '
          }`}
        >
          WOMEN
        </MenubarTrigger>
        <MenubarContent className="w-[100px] ">
          {mainCategories
            ?.filter((category) => category.gender.includes('WOMEN'))
            .map((category, index) => (
              <div key={index}>
                <MenubarItem className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                  <Link href={`/${category.id}`}>{category.name}</Link>
                </MenubarItem>

                <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                  {getSubcategories(category.id, ['WOMEN'])?.map(
                    (subcategory, subIndex) => (
                      <MenubarItem
                        key={subIndex}
                        className="hover:text-green-300"
                      >
                        <ListItem
                          href={`/${subcategory.id}`}
                          title={subcategory.name}
                        />
                      </MenubarItem>
                    ),
                  )}
                </ul>
              </div>
            ))}
        </MenubarContent>{' '}
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-green-300 hover:text-green-300 rounded-none mx-3 focus:bg-transparent ${
            isFixed ? '' : 'text-white focus:text-white '
          }`}
        >
          UNISEX
        </MenubarTrigger>

        <MenubarContent className=" w-[100px] ">
          {mainCategories
            ?.filter(
              (category) =>
                category.gender.includes('MEN') &&
                category.gender.includes('WOMEN'),
            )
            .map((category, index) => (
              <div key={index}>
                <MenubarItem className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                  <Link href={`/${category.id}`}>{category.name}</Link>
                </MenubarItem>

                <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
                  {getSubcategories(category.id, ['MEN', 'WOMEN'])?.map(
                    (subcategory, subIndex) => (
                      <MenubarItem
                        key={subIndex}
                        className="hover:text-green-300"
                      >
                        <ListItem
                          href={`/${subcategory.id}`}
                          title={subcategory.name}
                        />
                      </MenubarItem>
                    ),
                  )}
                </ul>
              </div>
            ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

// export const NavigationMenuTrigger = React.forwardRef<
//   React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
//   <NavigationMenuPrimitive.Trigger
//     ref={ref}
//     className={clsx(navigationMenuTriggerStyle(), 'group', className)}
//     {...props}
//   >
//     {children}
//   </NavigationMenuPrimitive.Trigger>
// ));
// NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export default HeaderMenubar;
