import * as React from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@vestido-ecommerce/shadcn-ui/navigation-menu';
import { Search } from 'lucide-react';
import { Input } from '@vestido-ecommerce/shadcn-ui/input';

type ListItemProps = {
  href: string;
  title: string;
  children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ href, title, children }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
        href={href}
      >
        <div className="mb-2 mt-4 text-lg font-medium">{title}</div>
        <p className="text-sm leading-tight text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

const mens = [
  {
    title: 'Top Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>T-shirt</li>
        <li>Shirt</li>
        <li>Jacket</li>
      </ul>
    ),
  },
  {
    title: 'Bottom Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>Pant</li>
        <li>Inner</li>
        <li>Trouser</li>
      </ul>
    ),
  },
];
const womens = [
  {
    title: 'Top Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>Churidar</li>
        <li>Blouse</li>
        <li>Saree</li>
      </ul>
    ),
  },
  {
    title: 'Bottom Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>Pant</li>
        <li>Inner</li>
        <li>Partywear</li>
      </ul>
    ),
  },
];
const kids = [
  {
    title: 'Top Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>Boys</li>
      </ul>
    ),
  },
  {
    title: 'Bottom Wear',
    href: '/docs/primitives/alert-dialog',
    categoryTile: (
      <ul>
        <li>Girls</li>
      </ul>
    ),
  },
];

const categories = ["WOMEN'S", "MEN'S", 'KIDS'];

const CategoryHeader = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('WOMEN');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryData = () => {
    switch (selectedCategory) {
      case "MEN'S":
        return mens;
      case "WOMEN'S":
        return womens;
      case 'KIDS':
        return kids;
      default:
        return [];
    }
  };

  const currentCategoryData = getCategoryData();

  return (
    <div className="flex justify-between border-b border-gray-500 px-16">
      <div className="flex justify-between items-center py-2">
        <NavigationMenu className="px-4">
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  HOME
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {categories.map((category) => (
              <NavigationMenuItem key={category}>
                <NavigationMenuTrigger
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {currentCategoryData.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.categoryTile}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex space-x-4 items-center justify-items-center content-center">
        <Search />
        <Input type="search" placeholder="Search" />
      </div>
    </div>
  );
};

export default CategoryHeader;
