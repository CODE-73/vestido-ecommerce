import { ComponentProps, FC } from 'react';
import Link from 'next/link';

import { useAuth } from '../providers';

type AuthenticatedLinkProps = ComponentProps<typeof Link>;

export const AuthenticatedLink: FC<AuthenticatedLinkProps> = (props) => {
  const { isAuthenticated, loginRoute } = useAuth();

  return <Link {...props} href={isAuthenticated ? props.href : loginRoute} />;
};
