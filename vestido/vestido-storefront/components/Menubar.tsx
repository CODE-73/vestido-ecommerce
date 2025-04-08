import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

// import useIsMobile from '../hooks/useIsMobile';
import { Gender } from '@vestido-ecommerce/items';
import {
  ListCategoryResponse,
  useCategories,
} from '@vestido-ecommerce/items/client';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';

type Category = NonNullable<ListCategoryResponse['data']>[number];

type NavMenuProps = Record<string, never>;

const NavMenu: React.FC<NavMenuProps> = () => {
  const { data: categories } = useCategories();

  const mainCategories = categories?.data?.filter(
    (category) => category.parentCategoryId === null,
  );

  const getSubcategories = (categoryId: string, genders: Gender[]) => {
    return (categories?.data ?? []).filter(
      (subcategory) =>
        subcategory.parentCategoryId === categoryId &&
        genders.every((gender) => subcategory.gender.includes(gender)),
    );
  };

  // Logic Specific to NavigationMenu ViewPort
  const [offset, setOffset] = useState<number | null>(null);
  const [list, setList] = useState<HTMLUListElement | null>(null);
  const [value, setValue] = useState<string>();

  const onNodeUpdate = (
    trigger: HTMLButtonElement | null,
    itemValue: string,
  ) => {
    if (trigger && list && value === itemValue) {
      const listWidth = list.offsetWidth;
      const listCenter = listWidth / 1.2;

      const triggerOffsetRight =
        listWidth -
        trigger.offsetLeft -
        trigger.offsetWidth +
        trigger.offsetWidth / 2;

      setOffset(Math.round(listCenter - triggerOffsetRight));
    } else if (value === '') {
      setOffset(null);
    }
    return trigger;
  };

  return (
    <NavigationMenuPrimitive.Root
      value={value}
      onValueChange={setValue}
      className="relative z-10 flex max-w-max flex-1 items-center justify-center"
    >
      <NavigationMenuList ref={setList}>
        {(
          [
            { value: 'MEN', gender: 'MEN' satisfies Gender },
            { value: 'WOMEN', gender: 'WOMEN' satisfies Gender },
            { value: 'UNISEX', gender: ['MEN', 'WOMEN'] satisfies Gender[] },
          ] as const
        ).map(({ value, gender }) => (
          <NavigationMenuItem key={value} value={value}>
            <NavigationMenuTrigger
              className={`font-semibold h-6 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-white rounded-none mx-3 focus:bg-transparent text-white focus:text-white`}
              ref={(node) => onNodeUpdate(node, value)}
            >
              {value}
            </NavigationMenuTrigger>
            <CategoryNavContent
              gender={gender satisfies Gender | Gender[]}
              mainCategories={mainCategories}
              getSubcategories={getSubcategories}
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuViewport
        style={{
          // Avoid transitioning from initial position when first opening
          display: !offset ? 'none' : undefined,
          transform: `translateX(${offset}px)`,
          top: '100%',
          width: 'var(--radix-navigation-menu-viewport-width)',
          transition: 'all 0.5s ease',
        }}
      />
    </NavigationMenuPrimitive.Root>
  );
};

type CategorySectionProps = {
  gender: Gender | Gender[];
  mainCategories?: Array<Category>;
  getSubcategories: (categoryId: string, genders: Gender[]) => Category[];
};

const CategoryNavContent: React.FC<CategorySectionProps> = ({
  gender,
  mainCategories,
  getSubcategories,
}) => {
  const genders = Array.isArray(gender) ? gender : [gender];
  const filteredCategories = mainCategories?.filter((category) =>
    genders.every((g) => category.gender.includes(g)),
  );

  return (
    <NavigationMenuContent className="flex flex-col p-6 w-[100px] ">
      {filteredCategories?.map((category, index) => (
        <div key={index}>
          <div className="text-stone-500 capitalize hover:text-[#48cab2] px-2 cursor-pointer">
            <Link href={`/${category.id}`}>{category.name}</Link>
          </div>

          <ul className="text-stone-500 capitalize py-3 md:w-[200px] lg:w-[200px]">
            {getSubcategories(category.id, genders)?.map(
              (subcategory, subIndex) => (
                <div key={subIndex} className="hover:text-[#48cab2]">
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
    </NavigationMenuContent>
  );
};

type CategoryNavItemProps = {
  href: string;
  title: string;
};
export const CategoryNavItem: React.FC<CategoryNavItemProps> = ({
  href,
  title,
}) => (
  <li className="row-span-3">
    <Link
      className="flex select-none flex-col justify-start md:justify-end rounded-md  pl-3 no-underline outline-none focus:shadow-md"
      href={href}
    >
      <div className="font-normal text-sm font-medium p-1">{title}</div>
    </Link>
  </li>
);

export default NavMenu;
