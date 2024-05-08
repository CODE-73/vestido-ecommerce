import { NavigationItem } from '../../types/navigation';

// import {
//   LuShoppingCart,
//   LuPersonStanding,
//   LuBook,
//   LuSettings,
// } from 'react-icons/lu';

// TODO: Update href values to include proper slug
export const navItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    // icon: <LuShoppingCart />,
  },
  {
    id: 'categories',
    label: 'Categories',
    href: '/categories',
    // icon: <LuShoppingCart />,
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    // icon: <LuShoppingCart />,
  },
  {
    id: 'storefront',
    label: 'Storefront',
    href: '/storefront',
    // icon: <LuBook />,
  },
];
