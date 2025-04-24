import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';

import { Gender } from '@vestido-ecommerce/items';
import {
  ListCategoryResponse,
  useCategories,
} from '@vestido-ecommerce/items/client';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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

  // State for viewport offset and active item underline
  const [offset, setOffset] = useState<number | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const [value, setValue] = useState<string>('');

  // Refs for list and triggers
  const listRef = useRef<HTMLUListElement | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Update offset and underline when value or refs change
  useEffect(() => {
    const list = listRef.current;
    const trigger = triggerRefs.current.get(value);

    if (trigger && list && value) {
      // Calculate viewport offset
      const listWidth = list.offsetWidth;
      const triggerRect = trigger.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      const triggerCenter =
        triggerRect.left - listRect.left + triggerRect.width / 2;
      const viewportOffset = triggerCenter - listWidth / 2;
      setOffset(Math.round(viewportOffset));

      // Calculate underline position and width
      setUnderlineStyle({
        left: trigger.offsetLeft,
        width: trigger.offsetWidth,
      });
    } else if (value === '') {
      setOffset(null);
      setUnderlineStyle({ left: 0, width: 0 });
    }
  }, [value]);

  // Handle ref updates for triggers
  const handleTriggerRef = (
    node: HTMLButtonElement | null,
    itemValue: string,
  ) => {
    if (node) {
      triggerRefs.current.set(itemValue, node);
    } else {
      triggerRefs.current.delete(itemValue);
    }
  };

  return (
    <NavigationMenuPrimitive.Root
      value={value}
      onValueChange={setValue}
      className="relative z-10 flex max-w-max flex-1 items-center justify-center"
    >
      <NavigationMenuList ref={listRef} className="relative">
        {(
          [
            { value: 'MEN', gender: 'MEN' satisfies Gender },
            { value: 'WOMEN', gender: 'WOMEN' satisfies Gender },
            { value: 'UNISEX', gender: ['MEN', 'WOMEN'] satisfies Gender[] },
          ] as const
        ).map(({ value, gender }) => (
          <NavigationMenuItem key={value} value={value}>
            <NavigationMenuTrigger
              className="bg-transparent text-white hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:text-white hover:text-white active:text-white !bg-transparent !text-white"
              ref={(node) => handleTriggerRef(node, value)}
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
        {/* Underline indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 ease-in-out"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            transformOrigin: 'center',
          }}
        />
      </NavigationMenuList>
      <NavigationMenuViewport
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90"
        style={{
          display: offset === null ? 'none' : undefined,
          transform: `translateX(${offset ?? 0}px)`,
          top: '100%',
          width: 'var(--radix-navigation-menu-viewport-width)',
          transition: 'transform 0.3s ease-in-out',
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

  const getGender = (_gender: string | string[]) => {
    let gender: string | undefined;

    if (_gender?.length === 1 && _gender[0] === 'MEN') {
      gender = 'men';
    } else if (_gender?.length === 1 && _gender[0] === 'WOMEN') {
      gender = 'women';
    } else if (
      _gender?.length === 2 &&
      _gender[0] === 'MEN' &&
      _gender[1] === 'WOMEN'
    ) {
      gender = 'unisex';
    }

    return gender;
  };

  return (
    <NavigationMenuContent className="flex flex-col p-3 w-[200px]">
      <div className="pb-3">
        <Link href={`/products/search/${getGender(genders)}`}>All</Link>
      </div>
      {filteredCategories?.map((category, index) => (
        <div key={index}>
          <div className=" capitalize cursor-pointer">
            <Link href={`/${category.id}`}>{category.name}</Link>
          </div>
          <ul className="capitalize py-3 md:w-[200px]">
            {getSubcategories(category.id, genders)?.map(
              (subcategory, subIndex) => (
                <div key={subIndex}>
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
  <Link
    className="flex select-none flex-col justify-start md:justify-end rounded-md pl-3 no-underline outline-none focus:shadow-md"
    href={href}
  >
    <div className="font-normal text-sm font-medium p-1">{title}</div>
  </Link>
);

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

export default NavMenu;
