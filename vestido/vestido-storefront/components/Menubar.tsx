import * as React from 'react';
import Link from 'next/link';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import clsx from 'clsx';
import { LuChevronDown } from 'react-icons/lu';

import { Gender, useCategories } from '@vestido-ecommerce/items/client';
import {
  Accordion,
  AccordionContent,
} from '@vestido-ecommerce/shadcn-ui/accordion';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@vestido-ecommerce/shadcn-ui/menubar';

type ListItemProps = {
  href: string;
  title: string;
};
export const ListItem: React.FC<ListItemProps> = ({ href, title }) => (
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <MenubarItem className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                        <Link href={`/${category.id}`}>{category.name}</Link>
                      </MenubarItem>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="text-stone-500 capitalize md:w-[200px] lg:w-[200px]">
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <MenubarItem className=" text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
                        <Link href={`/${category.id}`}>{category.name}</Link>
                      </MenubarItem>
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                <Accordion
                  type="single"
                  collapsible
                  className="w-full bg-blue-500"
                >
                  <AccordionItem
                    value="item-1"
                    className="py-0 bg-blue-400 border-none"
                  >
                    <AccordionTrigger className="py-0">
                      <MenubarItem className=" text-stone-500 capitalize hover:text-green-300 hover:bg-transparent focus:bg-transparent focus:text-black px-2 cursor-pointer ">
                        <Link href={`/${category.id}`}>{category.name}</Link>
                      </MenubarItem>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-stone-500 capitalize md:w-[200px] lg:w-[200px]">
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={clsx(
        'flex flex-1 items-center justify-between font-medium transition-all py-1 [&[data-state=open]>svg]:rotate-180 focus:bg-transparent',
        className,
      )}
      {...props}
    >
      {children}
      <LuChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={clsx(className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

export default HeaderMenubar;
