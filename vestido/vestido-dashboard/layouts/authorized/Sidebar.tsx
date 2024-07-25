import { FC } from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';

import { NavigationItem } from '../../types/navigation';

type SideBarProps = {
  items: NavigationItem[];
};

const SideBar: FC<SideBarProps> = ({ items }) => (
  <NavigationMenu orientation="vertical">
    <NavigationMenuList className="pb-4">
      {items.map((item) => (
        <NavigationMenuItem key={item.id} style={{ paddingBottom: 8 }}>
          <Link href={item.href} legacyBehavior passHref>
            <NavigationMenuLink className="text-base text-subtitle group inline-flex h-10 w-full items-center font-semibold justify-start bg-background px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent data-[state=open]:bg-accent/50">
              <p>{item.label}</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export default SideBar;
