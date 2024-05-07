import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { NavigationMenuTrigger } from './CategoryHeader';

import { Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useState } from 'react';
import CategoriesDropDown from '../modules/HomePage/CategoriesDropDown';

type ListItemProps = {
  href: string;
  title: string;
};

const ListItem: React.FC<ListItemProps> = ({ href, title }) => (
  <li className="row-span-3">
    <a
      className="flex select-none flex-col justify-start md:justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md"
      href={href}
    >
      <div className="text-sm font-medium p-1">{title}</div>
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  return (
    <div className=" w-full bg-white shadow flex  justify-center">
      <div className="flex flex-1 justify-around items-center max-w-7xl ">
        <CategoriesDropDown />
        <div className=" sm:py-4 flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {categoriesData.map((category, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="font-semibold h-6 px-4 bg-transparent hover:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent hover:text-[#48CAB2] hover:border-b-2 border-[#48CAB2] rounded-none mx-3">
                    {category.category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex gap-2 p-3">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex}>
                          <h1 className="font-black px-4">
                            {subcategory.title}
                          </h1>
                          <ul className="grid gap-1 md:w-[200px] lg:w-[200px]">
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
        <div className="flex space-x-4 py-4">
          {/* User Icon */}
          <a>
            <Search />
          </a>
          <a href="/user">
            <UserRound />
          </a>
          {/* Heart Icon */}
          <a href="/wishlist/">
            <Heart />
          </a>
          {/* Shopping Cart Icon */}
          <a href="/cart">
            <ShoppingBag />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
