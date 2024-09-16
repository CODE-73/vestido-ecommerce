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
  // {
  //   id: 'Item Attribute',
  //   label: 'Item Attribute',
  //   href: '/attributes',

  // },
  {
    id: 'Orders',
    label: 'Orders',
    href: '/orders',
    // icon: <LuBook />,
  },
  {
    id: 'fulfillments',
    label: 'Fulfillments',
    href: '/fulfillments',
    // icon: <LuBook />,
  },
  {
    id: 'storefront',
    label: 'Storefront',
    href: '/storefront',
    // icon: <LuBook />,
  },
];
