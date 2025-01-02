import { NavigationItem } from '../../types/navigation';

// TODO: Update href values to include proper slug
export const navItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
  },
  {
    id: 'categories',
    label: 'Categories',
    href: '/categories',
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
  },
  {
    id: 'coupons',
    label: 'Coupons',
    href: '/coupons',
  },
  {
    id: 'Orders',
    label: 'Orders',
    href: '/orders',
  },
  {
    id: 'fulfillments',
    label: 'Fulfillments',
    href: '/fulfillments',
  },
  {
    id: 'storefront',
    label: 'Storefront',
    href: '/storefront',
  },
];
