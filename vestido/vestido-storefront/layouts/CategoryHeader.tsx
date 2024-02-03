import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { Search } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

type ListItemProps = {
  href: string;
  title: string;
};

const ListItem: React.FC<ListItemProps> = ({ href, title }) => (
  <li className="row-span-3">
    <a
      className="flex select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md"
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

const CategoryHeader = () => {
  return (
    <div className="flex justify-between border-b border-gray-500 px-16 p-3">
      <NavigationMenu>
        <NavigationMenuList>
          {categoriesData.map((category, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className="font-black px-4">
                {category.category}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex gap-2 p-3">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex}>
                      <h1 className="font-black px-4">{subcategory.title}</h1>
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
      <div className="flex space-x-4 items-center justify-items-center content-center">
        <Search />
        <Input type="search" placeholder="Search" />
      </div>
    </div>
  );
};

export default CategoryHeader;
