import { ComponentProps, FC } from 'react';
import Link from 'next/link';

import { useAuth } from '../providers';

type AuthenticatedLinkProps = ComponentProps<typeof Link>;

export const AuthenticatedLink: FC<AuthenticatedLinkProps> = (props) => {
  const { isAuthenticated, loginRoute, authLoaded } = useAuth();

  return (
    <span
      className={`${!authLoaded ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
    >
      <Link {...props} href={isAuthenticated ? props.href : loginRoute} />
    </span>
  );
};
