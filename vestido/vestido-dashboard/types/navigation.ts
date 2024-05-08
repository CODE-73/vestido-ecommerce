import { ReactElement } from 'react';

export type NavigationItem = {
  id: string;
  label: string;
  description?: string;
  icon?: ReactElement;
  href: string;
  canAccess?: () => boolean;
};
